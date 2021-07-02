import { Encoder } from 'form-data-encoder'
import { FormData } from 'formdata-node'
import { Readable } from 'stream'
import axios from 'axios'
import fs from 'fs/promises'
import jenkinsReady from '../jenkinsReady'
import Mustache from 'mustache'
import path from 'path'

jest.setTimeout(30000)

const jenkinsURL = 'http://jenkins:8080'

beforeEach(async () => await jenkinsReady(jenkinsURL))

test('valid Jenkinsfile, single component', async () => {
  const template = await fs.readFile(
    path.resolve(__dirname, '../Jenkinsfile.mustache'),
    'utf8'
  )

  const jenkinsfile = Mustache.render(template, {
    parallelStages: [
      {
        stages: [
          `stage('app1') {
  steps {
    dir('app1') {
      sh 'make ci'
    }
  }
}`,
        ],
      },
    ],
  })

  const data = new FormData()
  data.append('jenkinsfile', jenkinsfile)

  const encoder = new Encoder(data)

  const response = await axios({
    method: 'post',
    url: `${jenkinsURL}/pipeline-model-converter/validate`,
    data: Readable.from(encoder.encode()),
    headers: encoder.headers,
  })

  expect(response.data).toEqual('Jenkinsfile successfully validated.\n')
})
