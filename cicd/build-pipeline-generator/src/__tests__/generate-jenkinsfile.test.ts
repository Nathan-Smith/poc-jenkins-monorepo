import { vol } from 'memfs'
import path from 'path'

import generateJenkinsfile from '../generate-jenkinsfile'
import { mockComponent } from './__helpers__/mockComponent'

afterEach(() => vol.reset())

// eslint-disable-next-line @typescript-eslint/no-var-requires
jest.mock('fs', () => require('memfs').fs)

const realFs = jest.requireActual('fs')
const templatePath = path.resolve(__dirname, '../Jenkinsfile.mustache')

test('empty pipeline', () => {
  vol.fromJSON({
    [templatePath]: realFs.readFileSync(templatePath, 'utf8'),
  })
  const jenkinsfile = generateJenkinsfile({
    parallelStages: [],
  })
  expect(jenkinsfile).toMatchInlineSnapshot(`
    "// This file is generated from cicd/build-pipeline-generator/src/Jenkinsfile.mustache, read README.md for instructions to update

    pipeline {
      agent any

      stages {
        stage('init') {
          environment {
            DOCKER_CREDENTIALS = credentials('docker-repository-127-0-0-1.nip.io')
          }
          steps {
            sh 'docker login https://docker-repository-127-0-0-1.nip.io -u $DOCKER_CREDENTIALS_USR -p $DOCKER_CREDENTIALS_PSW'
          }
        }

      }
    }
    "
  `)
})

test(`
.
└── app1
`, () => {
  vol.fromJSON({
    [templatePath]: realFs.readFileSync(templatePath, 'utf8'),
    ...mockComponent('app1'),
  })

  const jenkinsfile = generateJenkinsfile({
    parallelStages: [
      {
        name: '1',
        stages: [{ name: 'app1', path: 'app1' }],
      },
    ],
  })
  expect(jenkinsfile).toMatchInlineSnapshot(`
    "// This file is generated from cicd/build-pipeline-generator/src/Jenkinsfile.mustache, read README.md for instructions to update

    pipeline {
      agent any

      stages {
        stage('init') {
          environment {
            DOCKER_CREDENTIALS = credentials('docker-repository-127-0-0-1.nip.io')
          }
          steps {
            sh 'docker login https://docker-repository-127-0-0-1.nip.io -u $DOCKER_CREDENTIALS_USR -p $DOCKER_CREDENTIALS_PSW'
          }
        }

        stage('1') {
          parallel {
            stage('app1') { steps { sh 'echo \\"Hello World\\"' } }
          }
        }
      }
    }
    "
  `)
})

test(`
.
└── app1
    └── lib1
`, () => {
  vol.fromJSON({
    [templatePath]: realFs.readFileSync(templatePath, 'utf8'),
    ...mockComponent('app1'),
    ...mockComponent('lib1'),
  })

  const jenkinsfile = generateJenkinsfile({
    parallelStages: [
      {
        name: '1',
        stages: [{ name: 'lib1', path: 'lib1' }],
      },
      {
        name: '2',
        stages: [{ name: 'app1', path: 'app1' }],
      },
    ],
  })
  expect(jenkinsfile).toMatchInlineSnapshot(`
    "// This file is generated from cicd/build-pipeline-generator/src/Jenkinsfile.mustache, read README.md for instructions to update

    pipeline {
      agent any

      stages {
        stage('init') {
          environment {
            DOCKER_CREDENTIALS = credentials('docker-repository-127-0-0-1.nip.io')
          }
          steps {
            sh 'docker login https://docker-repository-127-0-0-1.nip.io -u $DOCKER_CREDENTIALS_USR -p $DOCKER_CREDENTIALS_PSW'
          }
        }

        stage('1') {
          parallel {
            stage('lib1') { steps { sh 'echo \\"Hello World\\"' } }
          }
        }
        stage('2') {
          parallel {
            stage('app1') { steps { sh 'echo \\"Hello World\\"' } }
          }
        }
      }
    }
    "
  `)
})

test(`
.
├── app1
│   └── lib1
└── app2
    └── lib1
`, () => {
  vol.fromJSON({
    [templatePath]: realFs.readFileSync(templatePath, 'utf8'),
    ...mockComponent('app1'),
    ...mockComponent('app2'),
    ...mockComponent('lib1'),
  })

  const jenkinsfile = generateJenkinsfile({
    parallelStages: [
      {
        name: '1',
        stages: [{ name: 'lib1', path: 'lib1' }],
      },
      {
        name: '2',
        stages: [
          { name: 'app1', path: 'app1' },
          { name: 'app2', path: 'app2' },
        ],
      },
    ],
  })
  expect(jenkinsfile).toMatchInlineSnapshot(`
    "// This file is generated from cicd/build-pipeline-generator/src/Jenkinsfile.mustache, read README.md for instructions to update

    pipeline {
      agent any

      stages {
        stage('init') {
          environment {
            DOCKER_CREDENTIALS = credentials('docker-repository-127-0-0-1.nip.io')
          }
          steps {
            sh 'docker login https://docker-repository-127-0-0-1.nip.io -u $DOCKER_CREDENTIALS_USR -p $DOCKER_CREDENTIALS_PSW'
          }
        }

        stage('1') {
          parallel {
            stage('lib1') { steps { sh 'echo \\"Hello World\\"' } }
          }
        }
        stage('2') {
          parallel {
            stage('app1') { steps { sh 'echo \\"Hello World\\"' } }
            stage('app2') { steps { sh 'echo \\"Hello World\\"' } }
          }
        }
      }
    }
    "
  `)
})

test(`
.
├── app1
│   ├── lib1
│   └── lib2
└── app2
    ├── lib1
    └── lib2
`, () => {
  vol.fromJSON({
    [templatePath]: realFs.readFileSync(templatePath, 'utf8'),
    ...mockComponent('app1'),
    ...mockComponent('app2'),
    ...mockComponent('lib1'),
    ...mockComponent('lib2'),
  })

  const jenkinsfile = generateJenkinsfile({
    parallelStages: [
      {
        name: '1',
        stages: [
          { name: 'lib1', path: 'lib1' },
          { name: 'lib2', path: 'lib2' },
        ],
      },
      {
        name: '2',
        stages: [
          { name: 'app1', path: 'app1' },
          { name: 'app2', path: 'app2' },
        ],
      },
    ],
  })
  expect(jenkinsfile).toMatchInlineSnapshot(`
    "// This file is generated from cicd/build-pipeline-generator/src/Jenkinsfile.mustache, read README.md for instructions to update

    pipeline {
      agent any

      stages {
        stage('init') {
          environment {
            DOCKER_CREDENTIALS = credentials('docker-repository-127-0-0-1.nip.io')
          }
          steps {
            sh 'docker login https://docker-repository-127-0-0-1.nip.io -u $DOCKER_CREDENTIALS_USR -p $DOCKER_CREDENTIALS_PSW'
          }
        }

        stage('1') {
          parallel {
            stage('lib1') { steps { sh 'echo \\"Hello World\\"' } }
            stage('lib2') { steps { sh 'echo \\"Hello World\\"' } }
          }
        }
        stage('2') {
          parallel {
            stage('app1') { steps { sh 'echo \\"Hello World\\"' } }
            stage('app2') { steps { sh 'echo \\"Hello World\\"' } }
          }
        }
      }
    }
    "
  `)
})

test(`
.
└── tests1
    ├── app1
    │   ├── lib1
    │   └── lib2
    └── app2
        ├── lib1
        └── lib2
`, () => {
  vol.fromJSON({
    [templatePath]: realFs.readFileSync(templatePath, 'utf8'),
    ...mockComponent('app1'),
    ...mockComponent('app2'),
    ...mockComponent('lib1'),
    ...mockComponent('lib2'),
    ...mockComponent('tests1'),
  })

  const jenkinsfile = generateJenkinsfile({
    parallelStages: [
      {
        name: '1',
        stages: [
          { name: 'lib1', path: 'lib1' },
          { name: 'lib2', path: 'lib2' },
        ],
      },
      {
        name: '2',
        stages: [
          { name: 'app1', path: 'app1' },
          { name: 'app2', path: 'app2' },
        ],
      },
      {
        name: '3',
        stages: [{ name: 'tests1', path: 'tests1' }],
      },
    ],
  })
  expect(jenkinsfile).toMatchInlineSnapshot(`
    "// This file is generated from cicd/build-pipeline-generator/src/Jenkinsfile.mustache, read README.md for instructions to update

    pipeline {
      agent any

      stages {
        stage('init') {
          environment {
            DOCKER_CREDENTIALS = credentials('docker-repository-127-0-0-1.nip.io')
          }
          steps {
            sh 'docker login https://docker-repository-127-0-0-1.nip.io -u $DOCKER_CREDENTIALS_USR -p $DOCKER_CREDENTIALS_PSW'
          }
        }

        stage('1') {
          parallel {
            stage('lib1') { steps { sh 'echo \\"Hello World\\"' } }
            stage('lib2') { steps { sh 'echo \\"Hello World\\"' } }
          }
        }
        stage('2') {
          parallel {
            stage('app1') { steps { sh 'echo \\"Hello World\\"' } }
            stage('app2') { steps { sh 'echo \\"Hello World\\"' } }
          }
        }
        stage('3') {
          parallel {
            stage('tests1') { steps { sh 'echo \\"Hello World\\"' } }
          }
        }
      }
    }
    "
  `)
})

test(`
.
├── app3
├── tests1
│   ├── app1
│   │   ├── lib1
│   │   └── lib3
│   │       └── lib2
│   └── app2
│       └── lib3
│           └── lib2
└── tests2
    └── app2
        └── lib3
            └── lib2
`, () => {
  vol.fromJSON({
    [templatePath]: realFs.readFileSync(templatePath, 'utf8'),
    ...mockComponent('app1'),
    ...mockComponent('app2'),
    ...mockComponent('app3'),
    ...mockComponent('lib1'),
    ...mockComponent('lib2'),
    ...mockComponent('lib3'),
    ...mockComponent('tests1'),
    ...mockComponent('tests2'),
  })

  const jenkinsfile = generateJenkinsfile({
    parallelStages: [
      {
        name: '1',
        stages: [
          { name: 'app3', path: 'app3' },
          { name: 'lib1', path: 'lib1' },
          { name: 'lib2', path: 'lib2' },
        ],
      },
      {
        name: '2',
        stages: [{ name: 'lib3', path: 'lib3' }],
      },
      {
        name: '3',
        stages: [
          { name: 'app1', path: 'app1' },
          { name: 'app2', path: 'app2' },
        ],
      },
      {
        name: '4',
        stages: [
          { name: 'tests1', path: 'tests1' },
          { name: 'tests2', path: 'tests2' },
        ],
      },
    ],
  })
  expect(jenkinsfile).toMatchInlineSnapshot(`
    "// This file is generated from cicd/build-pipeline-generator/src/Jenkinsfile.mustache, read README.md for instructions to update

    pipeline {
      agent any

      stages {
        stage('init') {
          environment {
            DOCKER_CREDENTIALS = credentials('docker-repository-127-0-0-1.nip.io')
          }
          steps {
            sh 'docker login https://docker-repository-127-0-0-1.nip.io -u $DOCKER_CREDENTIALS_USR -p $DOCKER_CREDENTIALS_PSW'
          }
        }

        stage('1') {
          parallel {
            stage('app3') { steps { sh 'echo \\"Hello World\\"' } }
            stage('lib1') { steps { sh 'echo \\"Hello World\\"' } }
            stage('lib2') { steps { sh 'echo \\"Hello World\\"' } }
          }
        }
        stage('2') {
          parallel {
            stage('lib3') { steps { sh 'echo \\"Hello World\\"' } }
          }
        }
        stage('3') {
          parallel {
            stage('app1') { steps { sh 'echo \\"Hello World\\"' } }
            stage('app2') { steps { sh 'echo \\"Hello World\\"' } }
          }
        }
        stage('4') {
          parallel {
            stage('tests1') { steps { sh 'echo \\"Hello World\\"' } }
            stage('tests2') { steps { sh 'echo \\"Hello World\\"' } }
          }
        }
      }
    }
    "
  `)
})
