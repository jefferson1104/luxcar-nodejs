# NOTES

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

### RUN PROJECT
```bash
  # install dependencies
  $ yarn

  # create container and up using docker-compose
  $ docker-compose up -d

  # run project in local machine
  $ yarn dev

  # open documentation API 
  http://localhost:3333/api-docs
```

### TYPEORM COMMANDS
```bash
  # typeorm script created in package.json
  "typeorm": "ts-node-dev ./node_modules/typeorm/cli"

  # to create migration file
  $ yarn typeorm migration:create -n NAME_MIGRATION

  # to execute all migrations files
  $ yarn typeorm migration:run

  # to delete/revert all migrations files
  $ yarn typeorm migration:revert
```

### JEST AND TESTS
**Unity tests**: test each feature separately
**Integration tests**: test the entire system flow
**TDD**: Test Driven Development, test-based software development technique, first develop the test and then make the software so that it passes the test.

```bash
  # install jest and types
  $ yarn add jest @types/jest -D

  # initialize jest in your project
  $ yarn jest --init

  # response questions after run jest --init
  ✔ Would you like to use Jest when running "test" script in "package.json"? … yes
  ✔ Would you like to use Typescript for the configuration file? … yes
  ✔ Choose the test environment that will be used for testing › node
  ✔ Do you want Jest to add coverage reports? … no
  ✔ Which provider should be used to instrument code for coverage? › v8
  ✔ Automatically clear mock calls, instances, contexts and results before every test? … yes

  # install preset ts-jest to use jest with typescript 
  $  yarn add ts-jest -D 

  # add the lines below in your jest.config.ts
  preset: "ts-jest",
  testMatch: ["**/*.spec.ts"],
  bail: true,
```