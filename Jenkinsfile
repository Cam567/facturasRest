pipeline {
    agent any
    stages{

        stage("Descargar código de la aplicación"){
            steps{
                git "url"
            } 
        }        

        stage("Creación de imagen"){
            steps{
                if(isUnix()){
                    sh( script: "docker build -t camila-formacion/app-rest")
                }
                else{
                    bat "docker build -t camila-formacion/app-rest"
                }
            }
        }

       stage("Ejecución de contenedor"){
           steps {
               sh "docker run -d --name app1 -p 8081:8080 camila-formacion/app1"
               if(isUnix()){
                    sh "docker run -d --name app1 -p 8081:8080 camila-formacion/app1"
                }
                else{
                    bat "docker run -d --name app1 -p 8081:8080 camila-formacion/app1"
                }
           }
           
        }

        stage("Test del servicio"){
            steps {
                echo "Probando el servicio ..."
            }
        }

        stage("Cerrar recursos"){
           steps {
                sh "docker stop app1"
                sh "docker container rm app1" 
            }            
        }
    }
}
