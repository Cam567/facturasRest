pipeline {
    agent any
    stages{

        stage("Descargar código de la aplicación"){
            steps{
                git "https://github.com/Cam567/facturasRest.git"
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
               if(isUnix()){
                    sh "docker run -d --name app-rest -p 8081:8080 camila-formacion/app-rest"
                }
                else{
                    bat "docker run -d --name app-rest -p 8081:8080 camila-formacion/app-rest"
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
                sh "docker stop app-rest"
                sh "docker container rm app-rest" 
                sh "docker image rm camila-formacion/app-rest"
            }            
        }
    }
}
