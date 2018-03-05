pipeline {
    agent {
        docker { image 'trion/ng-cli-karma' }
    }
    stages {
        stage('Test') {
            steps {
                sh 'npm rebuild node-sass --force'
                sh 'ng test --watch false'
                sh 'python3 --version'
            }
        }
        /*
        stage('Modify application properties') {
            steps {
                sh 'chmod +x ./scripts/update-application-properties.sh'
                sh './scripts/update-application-properties.sh ${INFOS_PATH}'
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
        */
    }
}