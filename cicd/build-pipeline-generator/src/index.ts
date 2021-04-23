import { Command } from 'commander'
import fs from 'fs'
import path from 'path'

import generateDepGraph from './gen-dep-graph'
import generateJenkinsfile from './gen-jenkinsfile'
import generatePipeline from './gen-pipeline'

const repoPath = path.resolve(__dirname, '../../..')

const program = new Command()
  .option('-o, --output [path]', 'output Jenkinsfile')
  .parse(process.argv)

const options = program.opts()

fs.writeFileSync(
  options.output || path.resolve(repoPath, 'Jenkinsfile'),
  generateJenkinsfile(generatePipeline(generateDepGraph(repoPath))),
  'utf8'
)
