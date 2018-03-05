pipeline {
    // agent { dockerfile true }
    agent {
        docker { image 'trion/ng-cli-karma' }
    }
    stages {
        stage('Test') {
            steps {
                sh 'node --version'
                sh 'svn --version'
                sh 'ng test'
            }
        }
    }
}