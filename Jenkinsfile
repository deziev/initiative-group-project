pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        echo 'Building $service'
        sh '''cd $service
yarn install --pure-lockfile'''
      }
    }
    stage('Compile') {
      steps {
        echo 'Compiling $service'
        sh '''cd $service
yarn compile'''
      }
    }
    stage('Deploy') {
      parallel {
        stage('Package') {
          steps {
            echo 'Creating Package $service.tar.gz'
            sh 'echo "package"'
          }
        }
        stage('Remote') {
          steps {
            sh '''echo "[DEPLOY] Creating Package $service.tar.gz"
rm -rf $service.tar.gz
tar -czf $service.tar.gz -C $(pwd)/$service .

echo "[DEPLOY] Delivering package to server"

ssh $remote_user@$remote_host "rm -rf /tmp/$service" 
scp $service.tar.gz $remote_user@$remote_host:/tmp

ssh $remote_user@$remote_host "rm -rf /opt/${service}"
ssh $remote_user@$remote_host "mkdir /opt/${service}"
ssh $remote_user@$remote_host "tar -xzf /tmp/${service}.tar.gz -C /opt/${service}"

echo "[DEPLOY] Deploying package"
ssh $remote_user@$remote_host "rm -rf /etc/supervisor/conf.d/${service}.conf"
ssh $remote_user@$remote_host "ln -s /opt/${service}/env/${service}.conf /etc/supervisor/conf.d/${service}.conf"
ssh $remote_user@$remote_host "service supervisor restart"'''
          }
        }
      }
    }
    stage('Notify') {
      steps {
        mail(subject: 'Build status', body: '$BUILD_STATUS', to: 'miborisov@nes.ru')
      }
    }
  }
  environment {
    remote_user = 'root'
    remote_host = '51.15.116.61'
    service = 'locationService'
  }
}