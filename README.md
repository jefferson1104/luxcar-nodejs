# NOTES

### PROJECT AND RUN PROJECT
```bash
  # run project in local machine
  $ yarn dev

  # Create container and run project using docker-compose
  $ docker-compose up -d

  # open documentation API in local
  http://localhost:3333/api-docs
```


### DOCKER AND DOCKER-COMPOSE COMMANDS
```bash
  # Create docker image from Dockerfile
  $ sudo docker build -t luxcar . 

  # Create and run container from image created
  $ sudo docker run -p 3333:3333 luxcar

  # List container status and infos
  $ sudo docker ps -a

  # Run docker container created
  $ sudo docker stop CONTAINER_ID

  # Stop docker container
  $ sudo docker stop CONTAINER_ID

  # Delete container
  $ sudo docker rm CONTAINER_ID

  # View container logs 
  $ docker logs CONTAINER_NAME

  # Observer container logs 
  $ docker logs CONTAINER_NAME -f

  # Run Dockerfile using docker-compose
  $ docker-compose up

  # Run Dockerfile using docker-compose running in background
  $ docker-compose up -d
```
