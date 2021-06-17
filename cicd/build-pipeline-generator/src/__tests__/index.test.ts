import glob from 'glob'
import shell from 'shelljs'

function generateJenkinsfile(componentName: string) {
  shell
    .echo(
      `
  stage('${componentName}') {
    steps {
      dir('${componentName}') {
        sh 'make ci'
      }
    }
  }
  `
    )
    .to(`${componentName}/Jenkinsfile`)
}

beforeEach(async () => {
  shell.mkdir('./test-repo')
  shell.pushd('-q', './test-repo')
  shell.exec('git init')
  shell.exec('git config user.email "you@example.com"')
  shell.exec('git config user.name "Your Name"')

  shell.exec('git checkout -b develop')

  shell.echo('0.1.0-dev.0').to('VERSION')

  shell.mkdir('app1')
  shell.touch('app1/README.md')
  shell.touch('app1/test.js')
  shell.echo('0.1.0-dev.0').to('app1/VERSION')
  shell.echo('lib1').to('app1/deps')
  shell.echo('lib2').toEnd('app1/deps')
  generateJenkinsfile('app1')

  shell.mkdir('app2')
  shell.touch('app2/README.md')
  shell.touch('app2/test.js')
  shell.mkdir('app2/part')
  shell.touch('app2/part/index.js')
  shell.echo('0.1.0-dev.0').to('app2/VERSION')
  shell.echo('lib2').to('app2/deps')
  generateJenkinsfile('app2')

  shell.mkdir('app3')
  shell.touch('app3/README.md')
  shell.touch('app3/test.js')
  shell.echo('0.1.0-dev.0').to('app3/VERSION')
  shell.echo('lib2').to('app3/deps')
  generateJenkinsfile('app3')

  shell.mkdir('lib1')
  shell.touch('lib1/README.md')
  shell.echo('0.1.0-dev.0').to('lib1/VERSION')
  generateJenkinsfile('lib1')

  shell.mkdir('lib2')
  shell.touch('lib2/README.md')
  shell.echo('0.1.0-dev.0').to('lib2/VERSION')
  generateJenkinsfile('lib2')

  shell.mkdir('test1')
  shell.touch('test1/README.md')
  shell.touch('test1/test.js')
  shell.echo('0.1.0-dev.0').to('test1/VERSION')
  shell.echo('app3').to('test1/deps')
  generateJenkinsfile('test1')

  shell.exec('build-pipeline-generator')

  shell.exec('git add .')
  shell.exec('git commit -m "Commit on develop"')
})

afterEach(async () => {
  shell.popd('-q')
  shell.rm('-rf', './test-repo')
})

test('Generates Jenkinsfile', async () => {
  shell.exec('build-pipeline-generator')

  expect(glob.sync('Jenkinsfile').length).toBe(1)
})

test('Validates Jenkinsfile no changes', async () => {
  expect(shell.exec('build-pipeline-generator --validate').code).toBe(0)
})

test('Validates Jenkinsfile changes', async () => {
  shell.exec('git checkout -b feature/test')

  shell.mkdir('lib3')
  shell.touch('lib3/README.md')
  shell.echo('0.1.0-dev.0').to('lib3/VERSION')
  generateJenkinsfile('lib3')

  shell.exec('git add .')
  shell.exec('git commit -m "Commit on feature/test"')

  expect(shell.exec('build-pipeline-generator --validate').code).toBe(1)
})
