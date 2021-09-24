pipeline{
    agent any
    stages{
        stage("Creación de imagen"){
            step{
                if(isUnix()){
                    sh( script: "docker build -t app-rest")
                }
                else{
                    bat "docker build -t app-rest"
                }
            }
        }

        stage("Ejecución de contenedor"){
            step{
                if(isUnix()){
                    sh( script: "docker build -t app-rest")
                }
                else{
                    bat "docker build -t app-rest"
                }
            }
        }
        stage("Test del servicio"){
            step{
                echo "Probando el servicio"
            }
        }
        stage("Cerrar recursos"){
            step{
                if(isUnix()){
                    sh( script: "docker stop app-rest")
                    sh( script: "docker stop app-rest")
                }
                else{
                    bat "docker build -t app-rest"

                }
            }
        }
    }
}