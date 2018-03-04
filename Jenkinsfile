pipeline {
    environment {
        TARGET_PATH     = '/home/apps/sharing-craftsman-web'
        INFOS_PATH      = 'scripts/knowledge-library-infos.yml'
    }

    agent {
        docker {
            image 'node:7-alpine'
        }
    }
    stages {
      stage('Test') {
        steps {
          sh 'node --version'
          sh 'npm install'
          sh 'npm test'
        }
      }
        // stage('Modify application properties') {
        //     steps {
        //         sh 'chmod +x ./scripts/update-application-properties.sh'
        //         sh './scripts/update-application-properties.sh ${INFOS_PATH}'
        //     }
        // }
        // stage('Build') {
        //     steps {
        //         sh 'mvn -B -DskipTests clean package'
        //     }
        // }
        // stage('Test') {
        //     steps {
        //         sh 'mvn test'
        //     }
        // }
        // stage('Deliver') {
        //     steps {
        //         sh 'chmod +x ./scripts/deliver.sh'
        //         sh './scripts/deliver.sh ${TARGET_PATH}'
        //     }
        // }
    }
}