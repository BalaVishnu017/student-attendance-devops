
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/BalaVishnu017/student-attendance-devops.git'
            }
        }

        stage('Check Node.js') {
            steps {
                bat 'node --version'
                bat 'npm --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Validate Project') {
            steps {
                bat 'node --check server.js'
                bat 'node -e "JSON.parse(require(\'fs\').readFileSync(\'package.json\', \'utf8\')); console.log(\'package.json is valid\')"'
            }
        }
    }
}
