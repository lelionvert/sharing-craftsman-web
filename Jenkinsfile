pipeline {
    environment {
        TARGET_PATH     = '/home/apps/sharing-craftsman-web'
        INFOS_PATH      = 'scripts/knowledge-library-infos.yml'
    }

    agent {
        // docker {
        //     // image 'selenium/node-chrome'
        //     image 'selenium/standalone-chrome'
        // }
        dockerfile true
    }
    stages {
      stage('Test') {
        steps {
          sh 'node --version'
          sh 'npm install'
          sh 'ng test'
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