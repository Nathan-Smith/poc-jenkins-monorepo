import { vol } from 'memfs'

import generateDepGraph from '../generate-dep-graph'
import validateJenkinsfile from '../validate-jenkinsfile'
import jenkinsReady from '../jenkinsReady'
import { mockComponent } from './__helpers__/mockComponent'

jest.setTimeout(30000)

// eslint-disable-next-line @typescript-eslint/no-var-requires
jest.mock('fs', () => require('memfs').fs)

const jenkinsURL = 'http://jenkins:8080'

beforeEach(async () => await jenkinsReady(jenkinsURL))

afterEach(() => vol.reset())

test('valid Jenkinsfile, single component', async () => {
  vol.fromJSON({
    ...mockComponent('app1'),
  })

  await expect(
    validateJenkinsfile(generateDepGraph(process.cwd()), '/opt/app', jenkinsURL)
  ).resolves.not.toBeNull()
})

test('valid Jenkinsfile, multiple components', async () => {
  vol.fromJSON({
    ...mockComponent('app1'),
    ...mockComponent('app2'),
  })

  await expect(
    validateJenkinsfile(generateDepGraph(process.cwd()), '/opt/app', jenkinsURL)
  ).resolves.not.toBeNull()
})

test('invalid Jenkinsfile, single components', async () => {
  vol.fromJSON({
    ...mockComponent(
      'app1',
      undefined,
      `stage('app1') { step { sh 'echo "Hello World"' } }`
    ),
  })

  await expect(
    validateJenkinsfile(generateDepGraph(process.cwd()), '/opt/app', jenkinsURL)
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
          "1 Jenkinsfile file had issues:
              app1/Jenkinsfile
                  Errors encountered validating Jenkinsfile:
                  WorkflowScript: 1: Unknown stage section \\"step\\". Starting with version 0.5, steps in a stage must be in a ‘steps’ block. @ line 1, column 52.
                     ; stages { /*<<ignore this<<*/stage('app
                                                   ^

                  WorkflowScript: 1: Expected one of \\"steps\\", \\"stages\\", or \\"parallel\\" for stage \\"app1\\" @ line 1, column 52.
                     ; stages { /*<<ignore this<<*/stage('app
                                                   ^


              "
        `)
})

test('invalid Jenkinsfile, multiple components', async () => {
  vol.fromJSON({
    ...mockComponent(
      'app1',
      undefined,
      `stage('app1') { step { sh 'echo "Hello World"' } }`
    ),
    ...mockComponent(
      'app2',
      undefined,
      `stage('app2') { sh 'echo "Hello World"' }`
    ),
  })

  await expect(
    validateJenkinsfile(generateDepGraph(process.cwd()), '/opt/app', jenkinsURL)
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
          "2 Jenkinsfile files had issues:
              app1/Jenkinsfile
                  Errors encountered validating Jenkinsfile:
                  WorkflowScript: 1: Unknown stage section \\"step\\". Starting with version 0.5, steps in a stage must be in a ‘steps’ block. @ line 1, column 52.
                     ; stages { /*<<ignore this<<*/stage('app
                                                   ^

                  WorkflowScript: 1: Expected one of \\"steps\\", \\"stages\\", or \\"parallel\\" for stage \\"app1\\" @ line 1, column 52.
                     ; stages { /*<<ignore this<<*/stage('app
                                                   ^


              app2/Jenkinsfile
                  Errors encountered validating Jenkinsfile:
                  WorkflowScript: 1: Unknown stage section \\"sh\\". Starting with version 0.5, steps in a stage must be in a ‘steps’ block. @ line 1, column 52.
                     ; stages { /*<<ignore this<<*/stage('app
                                                   ^

                  WorkflowScript: 1: Expected one of \\"steps\\", \\"stages\\", or \\"parallel\\" for stage \\"app2\\" @ line 1, column 52.
                     ; stages { /*<<ignore this<<*/stage('app
                                                   ^


              "
        `)
})
