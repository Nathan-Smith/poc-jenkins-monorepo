import mockFs from 'mock-fs'

import generateJenkinsfile from '../gen-jenkinsfile'
import { mockComponent } from './__helpers__/mockComponent'

afterEach(mockFs.restore)

test('empty pipeline', () => {
  const jenkinsfile = generateJenkinsfile({
    parallelStages: [],
  })
  expect(jenkinsfile).toMatchInlineSnapshot(`
    "// This file is generated from cicd/build-pipeline-generator/src/Jenkinsfile.mustache, read README.md for instructions to update

    pipeline {
      agent any

      stages {
      }
    }
    "
  `)
})

test(`
.
└── app1
`, () => {
  mockFs({
    'src/Jenkinsfile.mustache': mockFs.load('src/Jenkinsfile.mustache'),
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
        stage('1') {
          parallel {
            stage('app1') {}
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
  mockFs({
    'src/Jenkinsfile.mustache': mockFs.load('src/Jenkinsfile.mustache'),
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
        stage('1') {
          parallel {
            stage('lib1') {}
          }
        }
        stage('2') {
          parallel {
            stage('app1') {}
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
  mockFs({
    'src/Jenkinsfile.mustache': mockFs.load('src/Jenkinsfile.mustache'),
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
        stage('1') {
          parallel {
            stage('lib1') {}
          }
        }
        stage('2') {
          parallel {
            stage('app1') {}
            stage('app2') {}
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
  mockFs({
    'src/Jenkinsfile.mustache': mockFs.load('src/Jenkinsfile.mustache'),
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
        stage('1') {
          parallel {
            stage('lib1') {}
            stage('lib2') {}
          }
        }
        stage('2') {
          parallel {
            stage('app1') {}
            stage('app2') {}
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
  mockFs({
    'src/Jenkinsfile.mustache': mockFs.load('src/Jenkinsfile.mustache'),
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
        stage('1') {
          parallel {
            stage('lib1') {}
            stage('lib2') {}
          }
        }
        stage('2') {
          parallel {
            stage('app1') {}
            stage('app2') {}
          }
        }
        stage('3') {
          parallel {
            stage('tests1') {}
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
  mockFs({
    'src/Jenkinsfile.mustache': mockFs.load('src/Jenkinsfile.mustache'),
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
        stage('1') {
          parallel {
            stage('app3') {}
            stage('lib1') {}
            stage('lib2') {}
          }
        }
        stage('2') {
          parallel {
            stage('lib3') {}
          }
        }
        stage('3') {
          parallel {
            stage('app1') {}
            stage('app2') {}
          }
        }
        stage('4') {
          parallel {
            stage('tests1') {}
            stage('tests2') {}
          }
        }
      }
    }
    "
  `)
})
