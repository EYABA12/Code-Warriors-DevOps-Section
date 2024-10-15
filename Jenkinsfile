pipeline {
    agent any

    tools {
        maven 'Maven' // 'Maven' est le nom de l'outil configuré dans Jenkins
    }

    environment {
        FRONTEND_IMAGE_NAME = 'front-codewarriors'  // Nom de l'image frontend
        BACKEND_IMAGE_NAME = 'back-codewarriors'  // Nom de l'image backend
    }

    stages {
        stage('Maven Version') {
            steps {
                script {
                    sh 'mvn -v'
                }
            }
        }
        stage('Git Checkout') {
            steps {
                script {
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: '*/master']],
                        userRemoteConfigs: [[
                            url: 'https://github.com/EYABA12/code-warriors-pipline.git',
                            credentialsId: 'git'
                        ]]
                    ])
                    echo 'Git Checkout Completed'
                }
            }
        }

        stage('Login to Dockerhub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                    sh "echo \$DOCKERHUB_PASSWORD | docker login -u \$DOCKERHUB_USERNAME --password-stdin"
                }
            }
        }

        stage('Build and Push Frontend Docker Image') {
            steps {
                script {
                    def buildTag = "${env.BUILD_NUMBER}"

                    dir('frontend') {
                        sh """
                        docker build -t eyabenamor949/code-warriors .
                        """

                        sh """
                        docker tag eyabenamor949/code-warriors eyabenamor949/code-warriors:${buildTag}
                        docker tag eyabenamor949/code-warriors eyabenamor949/code-warriors:latest

                        """

                        sh """
                        docker push eyabenamor949/code-warriors:${buildTag}
                        docker push eyabenamor949/code-warriors:latest


                        """
                    }
                }
            }
        }

        stage('Build and Push Backend Docker Image') {
            steps {
                script {
                    def buildTag = "${env.BUILD_NUMBER}"

                    dir('backend') {
                        sh """
                        docker build -t eyabenamor949/code-warriors-backend .
                        """

                        sh """
                        docker tag eyabenamor949/code-warriors-backend eyabenamor949/code-warriors-backend:${buildTag}
                        docker tag eyabenamor949/code-warriors-backend eyabenamor949/code-warriors-backend:latest

                        """

                        sh """
                        docker push eyabenamor949/code-warriors-backend:${buildTag}
                        docker push eyabenamor949/code-warriors-backend:latest

                        """
                    }
                }
            }
        }
    }
}

