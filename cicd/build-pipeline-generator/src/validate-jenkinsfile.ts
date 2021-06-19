import { DepGraph } from 'dependency-graph'
import fs from 'fs'
import path from 'path'
import axios from 'axios'
import { FormData } from 'formdata-node'
import { Readable } from 'stream'
import { Encoder } from 'form-data-encoder'
import redent from 'redent'

import { Component } from './generate-dep-graph'
import jenkinsReady from './jenkinsReady'

interface ValidationError {
  message: string
  jenkinsfilePath: string
}

/**
 * For every Component in the `graph` validate its `Jenkinsfile` with Jenkins
 * @param graph  Graph containing all the Components in the Monorepo
 * @param repoPath Absolute path of the Repo at its root, used for error reporting
 * @param jenkinsURL Location of the Jenkins used for validation
 * @returns Unmodified `graph`
 * @throws Validation Errors, multiple files containing an issue will be included in a single Error message
 */
export default async function validateJenkinsfile(
  graph: DepGraph<Component>,
  repoPath: string,
  jenkinsURL: string
): Promise<DepGraph<Component>> {
  await jenkinsReady(jenkinsURL)

  const nodes = graph.overallOrder()
  const errors: ValidationError[] = []

  for (const node of nodes) {
    const component = graph.getNodeData(node)

    const jenkinsfile = `pipeline { agent none; stages { /*<<ignore this<<*/${fs.readFileSync(
      path.resolve(component.path, 'Jenkinsfile'),
      'utf8'
    )}/*>>ignore this>>*/}}`

    const data = new FormData()
    data.append('jenkinsfile', jenkinsfile)

    const encoder = new Encoder(data)

    const response = await axios({
      method: 'post',
      url: `${jenkinsURL}/pipeline-model-converter/validate`,
      data: Readable.from(encoder.encode()),
      headers: encoder.headers,
    })

    if (response.data !== 'Jenkinsfile successfully validated.\n') {
      errors.push({
        jenkinsfilePath: path.relative(
          repoPath,
          path.join(component.path, 'Jenkinsfile')
        ),
        message: response.data,
      })
    }
  }

  if (errors.length > 0) {
    throw new Error(`${errors.length} Jenkinsfile ${
      errors.length !== 1 ? 'files' : 'file'
    } had issues:
${errors
  .map(
    (error) => `    ${error.jenkinsfilePath}
${redent(error.message, 8)}`
  )
  .join('\n')}
    `)
  }

  return graph
}
