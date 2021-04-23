// This file is generated from cicd/build-pipeline-generator/src/Jenkinsfile.mustache, read README.md for instructions to update

pipeline {
  agent any

  stages {
    stage('1') {
      parallel {
        stage('build-pipeline-generator') {
          steps {
            dir('cicd/build-pipeline-generator') {
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
