pipeline {
    // agent { dockerfile true }
    agent {
        docker { image 'trion/ng-cli-karma' }
    }
    stages {
        stage('Test') {
            steps {
                sh 'npm rebuild node-sass'
                sh 'ng test'
            }
        }
    }
}