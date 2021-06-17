import fs from 'fs'
import Mustache from 'mustache'
import path from 'path'
import redent from 'redent'

import { Pipeline } from './gen-pipeline'

export default function generateJenkinsfile(pipeline: Pipeline): string {
  return Mustache.render(
    fs.readFileSync(path.resolve(__dirname, 'Jenkinsfile.mustache'), 'utf8'),
    {
      parallelStages: pipeline.parallelStages.map((parallelStage) => ({
        ...parallelStage,
        stages: parallelStage.stages.map((stage) =>
          redent(
            fs.readFileSync(path.resolve(stage.path, 'Jenkinsfile'), 'utf8'),
            8
          )
        ),
      })),
    }
  )
}
