// This file is generated from cicd/build-pipeline-generator/src/Jenkinsfile.mustache, read README.md for instructions to update

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
        stage('build-pipeline-generator') {
          steps {
            dir('cicd/build-pipeline-generator') {
              sh 'make ci'
            }
          }
        }

        stage('docker-repository-proxy') {
          steps {
            dir('cicd/docker-repository-proxy') {
              sh 'make ci'
            }
          }
        }

        stage('ingress') {
          steps {
            dir('cicd/ingress') {
              sh 'make ci'
            }
          }
        }

        stage('jenkins') {
          steps {
            dir('cicd/jenkins') {
              sh 'make ci'
            }
          }
        }

        stage('nexus') {
          steps {
            dir('cicd/nexus') {
              sh 'make ci'
            }
          }
        }

        stage('smee-client') {
          steps {
            dir('cicd/smee-client') {
              sh 'make ci'
            }
          }
        }

        stage('step-ca') {
          steps {
            dir('cicd/step-ca') {
              sh 'make ci'
            }
          }
        }

        stage('step-renewer') {
          steps {
            dir('cicd/step-renewer') {
              sh 'make ci'
            }
          }
        }

        stage("lib1") {
          steps {
            echo "Component... lib1"
          }
        }

        stage("lib2") {
          steps {
            echo "Component... lib2"
          }
        }

      }
    }
    stage('2') {
      parallel {
        stage('nexus-provision') {
          steps {
            dir('cicd/nexus-provision') {
              sh 'make ci'
            }
          }
        }

        stage("lib3") {
          steps {
            echo "Component... lib3"
          }
        }

      }
    }
    stage('3') {
      parallel {
        stage('app1') {
          steps {
            dir('app1') {
              sh 'make ci'
            }
          }
        }

        stage("app2") {
          steps {
            echo "Component... app2"
          }
        }

      }
    }
    stage('4') {
      parallel {
        stage("tests1") {
          steps {
            echo "Component... tests1"
          }
        }

        stage("tests2") {
          steps {
            echo "Component... tests2"
          }
        }

      }
    }
  }
}
