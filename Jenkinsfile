@Library('PipelineHelpers') _

pipeline {
    agent any

    environment {
        DOCKER_TAG = dockerHelpers.getSafeDockerTag()
        DOCKER_IMAGE = "services/nanowire-frontend:${env.DOCKER_TAG}"
        SAFE_BRANCH_NAME = dockerHelpers.getSafeBranchName()
        TESTING_LOCATION = "/worker"
    }

    stages {
        stage('Build') {
            steps {
                checkout scm

                script {
                    docker.build(env.DOCKER_IMAGE)
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    try {
                        dockerHelpers.runInDockerImage(
                            env.DOCKER_IMAGE,
                            "cd ${env.TESTING_LOCATION} && npm test",
                            []
                        )
                    } catch (error) {
                        slackSend (color: "#FFFE89", message: "Unit Tests failed: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)")
                    }
                }
            }
        }

        stage('Push to Dockerhub') {
            steps {
                script {
                    dockerHelpers.pushImageToDefaultRegistry(env.DOCKER_IMAGE, [env.SAFE_BRANCH_NAME])
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    kubeHelpers.updateDeploymentImage('nanowire-frontend', env.DOCKER_IMAGE, env.SAFE_BRANCH_NAME)
                }
            }
        }
    }

    post {
        always {
            script {
                pipelineHelpers.notifySlack(currentBuild)
            }
        }
    }
}