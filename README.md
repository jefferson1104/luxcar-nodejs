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

### TYPEORM COMMANDS
```bash
  # typeorm script created in package.json

  # to create migration file
  $ yarn typeorm migration:create -n NAME_MIGRATION

  # to execute all migrations files
  $ yarn typeorm migration:run
```