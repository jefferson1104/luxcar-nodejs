# NOTES


### DOCKER OR DOCKER-COMPOSE
```bash
  # Create docker image with Dockerfile
  $ sudo docker build -t luxcar . 

  # Run docker image and create container
  $ sudo docker run -p 3333:3333 luxcar

  # List container status and infos
  $ sudo docker ps -a

  # Stop docker container
  $ sudo docker stop CONTAINER_ID

  # Delete container
  $ sudo docker rm CONTAINER_ID

  # View container logs 
  $ docker logs CONTAINER_NAME -f

  # Run Dockerfile using docker-compose
  $ docker-compose up

  # Run Dockerfile using docker-compose running in background
  $ docker-compose up -d
```

### PROJECT AND RUN PROJECT
```bash
  # run project local
  $ yarn dev

  # open documentation API in local
  http://localhost:3333/api-docs
```