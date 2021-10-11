def hostTappPay=""
def userHost="ubuntu"

pipeline {
    agent {
        label {
            label ""
            customWorkspace "/var/docker/jenkins/labs/workspace/${JOB_NAME}_${BUILD_NUMBER}"
        }
    }
    stages {
        stage('Notify') {
            when { anyOf { branch 'develop'; branch 'main' } }
            steps {
                slackSend( channel: "#just-testing", color: '#FFFF00', message: ":crossed_fingers::skin-tone-5: STARTED: Build ${env.JOB_NAME} [${env.BUILD_NUMBER}] (<${env.RUN_DISPLAY_URL}|Open>)")
            }
        }
        stage('Build & Test') {
            agent {
                docker {
                    image 'node:14-alpine'
                    args '-v $HOME/docker-images-cached:/root/docker-images-cached'
                }
            }
            stages {
                stage('Build') {
                    steps {
                        sh 'yarn install'
                    }
                }
                stage('Lint') {
                    steps {
                        sh 'yarn lint'
                    }
                }
                stage('Unit Test') {
                    steps {
                        sh 'yarn test'
                    }
                }
            }
        }
        stage('Deploy Develop') {
            when { branch 'develop' }
            parallel {
                stage('Deploy ReactApp') {
                    when { expression { isAppChange() } }
                    agent any
                    steps {
                        sshagent(credentials : ['pem-tapp']) {
                            withCredentials([string(credentialsId: 'deploy-token', variable: 'token')]) {
                                sh """ssh -tt -o StrictHostKeyChecking=no $userHost@$hostTappPay << EOF
                                sh /srv/node/TappPay/deploy/scripts/install-simple-node.sh ${token} develop dev && exit
                                EOF"""
                            }
                        }
                    }
                }
            }
        }
        stage('Deploy Main') {
            when { branch 'main' }
            parallel {
                stage('Deploy ReactApp') {
                    when { expression { isAppChange() } }
                    agent any
                    steps {
                        sshagent(credentials : ['pem-tapp']) {
                            withCredentials([string(credentialsId: 'deploy-token', variable: 'token')]) {
                                sh """ssh -tt -o StrictHostKeyChecking=no $userHost@$hostTappPay << EOF
                                sh /srv/node/TappPay/deploy/scripts/install-simple-node.sh ${token} develop dev && exit
                                EOF"""
                            }
                        }
                    }
                }
            }
        }
    }
    post {
        success {
            script {
                if (env.BRANCH_NAME == 'develop' || env.BRANCH_NAME == 'demo') {
                    slackSend( channel: "#just-testing", color: '#00FF00', message: "<!here> :smiley: SUCCESSFUL: Build ${env.JOB_NAME} [${env.BUILD_NUMBER}] (<${env.RUN_DISPLAY_URL}|Open>)")
                }
            }
        }
        failure {
            script {
                if (env.BRANCH_NAME == 'develop' || env.BRANCH_NAME == 'demo') {
                    slackSend( channel: "#just-testing", color: '#FF0000', message: "<!here> :scream: FAILED: Build ${env} [${env.BUILD_NUMBER}] (<${env.RUN_DISPLAY_URL}|Open>)")
                }
            }
        }
        unstable {
            script {
                if (env.BRANCH_NAME == 'develop' || env.BRANCH_NAME == 'demo') {
                    slackSend( channel: "#just-testing", color: '#FF0000', message: "<!here> :grimacing: UNSTABLE: Build ${env} [${env.BUILD_NUMBER}] (<${env.RUN_DISPLAY_URL}|Open>)")
                }
            }
        }
        cleanup {
            deleteDir()
            dir("${workspace}@tmp") {
                deleteDir()
            }
            dir("${workspace}@script") {
                deleteDir()
            }
            dir("${workspace}@script@tmp") {
                deleteDir()
            }
        }
    }
}
void getCurrentLogs() {
    def result = []
    def changeLogSets = currentBuild.changeSets
    for (int i = 0; i < changeLogSets.size(); i++) {
    def entries = changeLogSets[i].items
    for (int j = 0; j < entries.length; j++) {
        def entry = entries[j]
        def files = new ArrayList(entry.affectedFiles)
            for (int k = 0; k < files.size(); k++) {
                def file = files[k]
                result.add(file.path)
            }
        }
    }
    return result
}

void getCommonFiles() {
    return [
    '.eslintignore',
    '.eslintrc.js',
    '.gitignore',
    '.lintstagedrc',
    '.prettierignore',
    '.prettierrc',
    'Jenkinsfile',
    'package.json',
    'README.md',
    'yarn.lock']
}

void getCommonApis() {
    return []
}

void isAppChange() {
    def intersection = []
    def commons = getCommonFiles()
    def commonApis = getCommonApis()
    def filesAndPaths = commons.plus(commonApis)
    filesAndPaths.add('app')
    def logs = getCurrentLogs()
    for (i in logs) {
        for (j in filesAndPaths) {
            if(i.startsWith(j)) intersection.add(j)
        }
    }
    return (intersection ? true : false)
}
