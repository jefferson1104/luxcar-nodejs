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

  # Verify container ip address 
  $ sudo docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' CONTAINER_NAME

  # View container logs 
  $ sudo docker logs CONTAINER_NAME

  # Observer container logs 
  $ sudo docker logs CONTAINER_NAME -f

  # Run Dockerfile using docker-compose or Start containers
  $ sudo docker-compose up

  # Run Dockerfile using docker-compose in background or Start containers in background
  $ sudo docker-compose up -d

  # Stop containers
  $ sudo docker-compose stop
```

### TYPEORM COMMANDS
```bash
  # typeorm script created in package.json

  # to create migration file
  $ yarn typeorm migration:create -n NAME_MIGRATION

  # to execute all migrations files
  $ yarn typeorm migration:run

  # to delete/revert all migrations files
  $ yarn typeorm migration:revert
```