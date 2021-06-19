import glob from 'glob'
import fs from 'fs'
import shell, { ExecOptions, ShellString } from 'shelljs'
import jenkinsReady from '../jenkinsReady'

jest.setTimeout(30000)

function generateJenkinsfile(componentName: string) {
  fs.writeFileSync(
    `${componentName}/Jenkinsfile`,
    `
  stage('${componentName}') {
    steps {
      dir('${componentName}') {
        sh 'make ci'
      }
    }
  }
  `,
    'utf8'
  )
}

const execDefault: ExecOptions = { silent: process.env.VERBOSE === '0' }
const testRepoDir = '/tmp/test-repo'

beforeEach(async () => {
  await jenkinsReady('http://jenkins:8080')

  shell.mkdir(testRepoDir)
  shell.pushd('-q', testRepoDir)
  shell.exec('git init', execDefault)
  shell.exec('git config user.email "you@example.com"', execDefault)
  shell.exec('git config user.name "Your Name"', execDefault)

  shell.exec('git checkout -b develop', execDefault)

  shell.exec('echo 0.1.0-dev.0 > VERSION', execDefault)

  shell.mkdir('app1')
  shell.touch('app1/README.md')
  shell.touch('app1/test.js')
  shell.exec('echo 0.1.0-dev.0 > app1/VERSION', execDefault)
  shell.exec('echo lib1 > app1/deps', execDefault)
  shell.exec('echo lib2 >> app1/deps', execDefault)
  generateJenkinsfile('app1')

  shell.mkdir('app2')
  shell.touch('app2/README.md')
  shell.touch('app2/test.js')
  shell.mkdir('app2/part')
  shell.touch('app2/part/index.js')
  shell.exec('echo 0.1.0-dev.0 > app2/VERSION', execDefault)
  shell.exec('echo lib2 > app2/deps', execDefault)
  generateJenkinsfile('app2')

  shell.mkdir('app3')
  shell.touch('app3/README.md')
  shell.touch('app3/test.js')
  shell.exec('echo 0.1.0-dev.0 > app3/VERSION', execDefault)
  shell.exec('echo lib2 > app3/deps', execDefault)
  generateJenkinsfile('app3')

  shell.mkdir('lib1')
  shell.touch('lib1/README.md')
  shell.exec('echo 0.1.0-dev.0 > lib1/VERSION', execDefault)
  generateJenkinsfile('lib1')

  shell.mkdir('lib2')
  shell.touch('lib2/README.md')
  shell.exec('echo 0.1.0-dev.0 > lib2/VERSION', execDefault)
  generateJenkinsfile('lib2')

  shell.mkdir('test1')
  shell.touch('test1/README.md')
  shell.touch('test1/test.js')
  shell.exec('echo 0.1.0-dev.0 > test1/VERSION', execDefault)
  shell.exec('echo app3 > test1/deps', execDefault)
  generateJenkinsfile('test1')

  shell.exec('build-pipeline-generator', execDefault)

  shell.exec('git add .', execDefault)
  shell.exec('git commit -m "Commit on develop"', execDefault)
})

afterEach(async () => {
  try {
    shell.popd('-q')
  } finally {
    shell.rm('-rf', testRepoDir)
  }
})

test('Generates Jenkinsfile', async () => {
  shell.exec('build-pipeline-generator', execDefault)

  expect(glob.sync('Jenkinsfile').length).toBe(1)
})

test('Validates Jenkinsfile no changes', async () => {
  expect(
    (shell.exec(
      'build-pipeline-generator --validate',
      execDefault
    ) as ShellString).code
  ).toBe(0)
})

test('Validates Jenkinsfile changes', async () => {
  shell.exec('git checkout -b feature/test', execDefault)

  shell.mkdir('lib3')
  shell.touch('lib3/README.md')
  shell.exec('echo 0.1.0-dev.0 > lib3/VERSION', execDefault)
  generateJenkinsfile('lib3')

  shell.exec('git add .', execDefault)
  shell.exec('git commit -m "Commit on feature/test"', execDefault)

  expect(
    (shell.exec(
      'build-pipeline-generator --validate',
      execDefault
    ) as ShellString).code
  ).toBe(1)
})
