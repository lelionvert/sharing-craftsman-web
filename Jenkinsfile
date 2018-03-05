pipeline {
    environment {
        TARGET_PATH     = '/home/apps/scweb'
    }

    agent {
        docker { image 'trion/ng-cli-karma' }
    }
    stages {
        stage('Test') {
            steps {
                sh 'npm rebuild node-sass --force'
                sh 'ng test --watch false'
            }
        }
        stage('Build') {
            steps {
                sh 'ng build'
            }
        }
        stage('Deliver') {
            steps {
                sh 'chmod +x ./scripts/deliver.sh'
                sh './scripts/deliver.sh ${TARGET_PATH}'
            }
        }
    }
}