#!/usr/bin/env node

import { Command } from 'commander'
import fs from 'fs'
import path from 'path'
import shell from 'shelljs'

import generateDepGraph from './gen-dep-graph'
import generateJenkinsfile from './gen-jenkinsfile'
import generatePipeline from './gen-pipeline'

const repoPath = shell.exec('git rev-parse --show-toplevel').trim()

console.log(`root (${repoPath})`)

const program = new Command()
  .option(
    '--validate',
    'exit code dependent on if the current Jenkinsfile matches the expected'
  )
  .parse(process.argv)

const options = program.opts()

fs.writeFileSync(
  path.resolve(repoPath, 'Jenkinsfile'),
  generateJenkinsfile(generatePipeline(generateDepGraph(repoPath))),
  'utf8'
)

if (
  options.validate &&
  shell.exec(`git diff --exit-code ${path.resolve(repoPath, 'Jenkinsfile')}`)
    .code !== 0
) {
  console.log(
    'Pipeline is out-of-date, to update the Jenkinsfile run:\n$ make build-pipeline'
  )
  process.exit(1)
}
