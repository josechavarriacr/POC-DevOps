def hostDev="dev.josechavarria.xyz"
def hostProd="prod.josechavarria.xyz"
def userHost="root"

pipeline {
    // agent {
    //     label {
    //         label ""
    //         customWorkspace "/var/docker/jenkins/labs/workspace/${JOB_NAME}_${BUILD_NUMBER}"
    //     }
    // }
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
        stage('Deploy Development') {
            when { branch 'develop' }
            parallel {
                stage('Deploy ReactApp') {
                    when { expression { isAppChange() } }
                    agent any
                    steps {
                        sshagent(credentials : ['public_key']) {
                            // withCredentials([string(credentialsId: 'deploy-token', variable: 'token')]) {
                                sh """ssh -tt -o StrictHostKeyChecking=no $userHost@$hostDev << EOF
                                cd /home/ && git remote set-url origin https://github.com/josechavarriacr/POC-DevOps.git &&
                                cd /home/POC-DevOps/ &&
                                git fetch --all && git checkout develop -f && git reset --hard origin/develop && git pull -f &&
                                cd /home/POC-DevOps/app && docker-compose up --build -d && exit
                                EOF"""
                            // }
                        }
                    }
                }
            }
        }
        stage('Deploy Production') {
            when { branch 'main' }
            parallel {
                stage('Deploy ReactApp') {
                    when { expression { isAppChange() } }
                    agent any
                    steps {
                        sshagent(credentials : ['public_key']) {
                            withCredentials([string(credentialsId: 'deploy-token', variable: 'token')]) {
                                sh """ssh -tt -o StrictHostKeyChecking=no $userHost@$hostProd << EOF
                                cd /home/ && git remote set-url origin https://github.com/josechavarriacr/POC-DevOps.git &&
                                cd /home/POC-DevOps/ &&
                                git fetch --all && git checkout main -f && git reset --hard origin/main && git pull -f &&
                                cd /home/POC-DevOps/app && docker-compose up --build -d && exit
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
                if (env.BRANCH_NAME == 'develop' || env.BRANCH_NAME == 'main') {
                    slackSend( channel: "#just-testing", color: '#00FF00', message: "<!here> :smiley: SUCCESSFUL: Build ${env.JOB_NAME} [${env.BUILD_NUMBER}] (<${env.RUN_DISPLAY_URL}|Open>)")
                }
            }
        }
        failure {
            script {
                if (env.BRANCH_NAME == 'develop' || env.BRANCH_NAME == 'main') {
                    slackSend( channel: "#just-testing", color: '#FF0000', message: "<!here> :scream: FAILED: Build ${env} [${env.BUILD_NUMBER}] (<${env.RUN_DISPLAY_URL}|Open>)")
                }
            }
        }
        unstable {
            script {
                if (env.BRANCH_NAME == 'develop' || env.BRANCH_NAME == 'main') {
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

