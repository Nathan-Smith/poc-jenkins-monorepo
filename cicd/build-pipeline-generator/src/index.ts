#!/usr/bin/env node

import { Command } from 'commander'
import fs from 'fs'
import path from 'path'
import shell from 'shelljs'

import generateDepGraph from './generate-dep-graph'
import generateJenkinsfile from './generate-jenkinsfile'
import generatePipeline from './generate-pipeline'
import validateJenkinsfile from './validate-jenkinsfile'

const program = new Command()
  .option(
    '--jenkins-url <url>',
    'Jenkins URL for Validation',
    'http://jenkins:8080'
  )
  .option(
    '--validate',
    'exit code dependent on if the current Jenkinsfile matches the expected'
  )
  .option('--verbose')
  .parse(process.argv)

const options = program.opts()

shell.config.silent = !options.verbose

const repoPath = shell.exec('git rev-parse --show-toplevel').trim()

options.verbose && console.log(`root (${repoPath})`)

async function main() {
  fs.writeFileSync(
    path.resolve(repoPath, 'Jenkinsfile'),
    generateJenkinsfile(
      generatePipeline(
        await validateJenkinsfile(
          generateDepGraph(repoPath),
          repoPath,
          options.jenkinsUrl
        )
      )
    ),
    'utf8'
  )

  if (
    options.validate &&
    shell.exec(`git diff --exit-code ${path.resolve(repoPath, 'Jenkinsfile')}`)
      .code !== 0
  ) {
    options.verbose &&
      console.log(
        'Pipeline is out-of-date, to update the Jenkinsfile run:\n$ make build-pipeline'
      )
    process.exit(1)
  }
}

main()
