pipeline {
    // agent { dockerfile true }
    agent {
        docker { image 'trion/ng-cli' }
    }
    stages {
        stage('Test') {
            steps {
                sh 'node --version'
                sh 'svn --version'
            }
        }
    }
}