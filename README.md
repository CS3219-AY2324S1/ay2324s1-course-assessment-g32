[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/6BOvYMwN)

# Setup

## Software Requirements

Download and install these software if you do not have them locally.

- [NodeJS](https://nodejs.org/en/download)
- [MySQL](https://dev.mysql.com/downloads/mysql/)

## Internet Access

Ensure that you are connected to the internet.

> Note!\
> Do **not** connect to NUS Wifi/Network.\
> The application would be unable to connect to MongoDB Atlas.

## Setup MySQL locally

Follow the steps in [Setup MySQL locally](docs/SetupLocalMySql.md).

Note the root password used, as it would be needed in the later parts.

## Setup environment variables

1. At the root directory, open a terminal
2. Duplicate `template.env` as `.env`
   ```
   cp template.env .env
   ```
3. Open `.env` file
4. Fill up the MYSQL root password
   (previously configured when installing MySQL)  
   - Example: if your root password is "password1234",
     `MYSQL_ROOT_PASSWORD=password1234`
5. Fill up a JWT token password
   (for generating and decoding JWT tokens)  
   - Example: if you want to set the password to "password",
     `JWT_SECRET_KEY=password`

## Install NodeJS packages

```
npm run install-all
```

# Start Application

Ensure that MySQL Server service has started.
(How to check? Click [here](docs/SetupLocalMySql.md#start-mysql-service).)

Start all services using the following commands:

```
npm run start-all
```

# Resources for Developer / Tester

## Software

For development, you may also want to install:

- [MongoDB Compass](https://www.mongodb.com/try/download/compass)
- [Docker Desktop](https://www.docker.com/get-started/)
- [Postman](https://www.postman.com/downloads/)

## Documentation

- [API Endpoints](docs/ApiEndpoints.md)
- Assignment 4: [Containerization](docs/Containerization.md)

## Micro-services

You can start individual services separately to test them.

However, as there are dependancies among the services,
they might not function normally standalone.

Run them in different terminals:

- Auth service: `npm run start:auth`
- User service: `npm run start:user`
- Question service: `npm run start:question`
- Frontend: `npm run start:frontend`


---
**For clarifications, do leave your questions at [Feedback PR](https://github.com/CS3219-AY2324S1/ay2324s1-course-assessment-g32/pull/1) created in our repository.**
