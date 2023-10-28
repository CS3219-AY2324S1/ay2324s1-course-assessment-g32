[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/6BOvYMwN)

# Assignment 5 - Matching

## Software Requirements

The combined application contains qualities of:
* Question Repository Application
* User Profile Management Application
* Matchmaking Application
* History Repository Application

We have various micro-services including:
* MySQL Database
* User Service
* Auth Service
* Question Service
* Match Service
* Collaboration Service
* History Service
* Frontend Service (Web UI)

Additional Notes:

If you are not using Windows OS, and would like a equivalent instruction for a different OS, do reach out to us for clarification.

**For clarifications, do leave your questions at [Feedback PR](https://github.com/CS3219-AY2324S1/ay2324s1-course-assessment-g32/pull/1) created in our repository.**

# Requirements

## Network

Internet connection is required.

**[ IMPORTANT! ]** Do _not_ test while on NUS grounds or connected
(either directly or indirectly) to NUS Wifi.
(NUS networks blocks MongoDB which is required by our application.)

## Software
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
2. Enter the following command
   ```
   cp template.env .env
   ```
3. Open `.env` file (This should be in the root directory)
4. Enter root password (previously configured when installing MySQL)  
   - Example: if your root password is "password1234",
     `MYSQL_ROOT_PASSWORD=password1234`
5. Enter JWT token password (for generating and decoding JWT tokens)  
   - Example: if your root password is "password",
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
- Match service: `npm run start:match`
- Collaboration service: `npm run start:collaboration`
- History service: `npm run start:history`


Note: If the above not work, please use the correct link or download the source code directly from the release.

### Setup environment variables

Duplicate `template.env` as `.env` at the root directory.

```shell
cp template.env .env
```

### Start Docker Daemon

Start the docker daemon by opening _Docker Desktop_.
If _Docker Desktop_ does not support your OS, do reach out to clarify how to start the docker daemon.

To check that the daemon has started, open a terminal and check the version.

```shell
docker version
```

It should output something like
```
Client:
 Cloud integration: v1.0.35+desktop.5
 Version:           24.0.6
 API version:       1.43
 Go version:        go1.20.7
 Git commit:        ed223bc
 Built:             Mon Sep  4 12:32:48 2023
 OS/Arch:           windows/amd64
 Context:           default

Server: Docker Desktop 4.24.2 (124339)
 Engine:
  Version:          24.0.6
  API version:      1.43 (minimum version 1.12)
  Go version:       go1.20.7
  Git commit:       1a79695
  Built:            Mon Sep  4 12:32:16 2023
  OS/Arch:          linux/amd64
  Experimental:     false
 containerd:
  Version:          1.6.22
  GitCommit:        8165feabfdfe38c65b599c4993d227328c231fca
 runc:
  Version:          1.1.8
  GitCommit:        v1.1.8-0-g82f18fe
 docker-init:
  Version:          0.19.0
  GitCommit:        de40ad0
```

## Testing

### Dockered Microservices

At the root directory, open a terminal
to create and start containers of the micro-services.

```shell
docker compose up -d
```

It may take a few minutes for the inital build as it needs to download the images online.
The frontend would only be available after the containers are running.

### Frontend Application

Locally, open a web browser and go to [http://localhost:3000](http://localhost:3000).

### Sample Accounts

By default, we have created 2 accounts as part of the fresh database. These accounts are for testing purposes, and would not be avilable for production.

| Email          | Password | Remarks                                  |
| -------------- | -------- | ---------------------------------------- |
| admin@test.com | password | Has admin rights. Regard as a superuser. |
| user@test.com  | password | Normal user. Cannot manage other users.  |

Note: if you delete these accounts via the user profile management functionalities, you may have from restart the pre-testing steps to get back the accounts.

### Optional Testing of API endpoints

If you wish to test individual microservice's API, you can refer to our [API endpoints](API_Endpoints.md).

## Post-testing

After testing, open a terminal at the root directory
to stop and remove the containers of the micro-services.

```shell
docker compose down
```
