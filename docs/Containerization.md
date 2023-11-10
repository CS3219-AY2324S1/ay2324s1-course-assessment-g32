# Containerization

Docker is used to containerize our various micro-services
which serves our combined application.

We have various micro-services including:
* Redis Service
* User Service
* Auth Service
* Question Service
* Match Service
* Collaboration Service
* History Service
* Execution Service
* Frontend Service (Web UI)

> Additional Note:\
> The instructions we have are based on Windows OS.
> Do reach out to us for clarification for other OS.

# Requirements

## Internet Access

Ensure that you are connected to the internet.

> [!IMPORTANT]
> Do **not** connect to NUS Wifi/Network.\
> The application would be unable to connect to MongoDB Atlas.

## Software

Download and install these software if you do not have them locally.

- [Docker Desktop](https://www.docker.com/get-started/)

> [!NOTE]
> **Ensure that RabbitMQ Server and Redis Server are NOT running locally.**

# Testing

Unless specified otherwise, the commands given below should be executed at the root directory.

> _The commands below are provided for convenience and may be incorrect.
> Do reach out to us for clarification if necessary._

## Pre-testing Set up

### Clone repository

Clone the repository locally to your device (laptop/computer).

```shell
git clone https://github.com/CS3219-AY2324S1/ay2324s1-course-assessment-g32.git
```

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

> [!WARNING]
> Take caution when deleting maintainer accounts.
> Do not delete until there is no accounts with admin rights.

Locally, open a web browser and go to [http://localhost:3000](http://localhost:3000).

## Post-testing

After testing, open a terminal at the root directory
to stop and remove the containers of the micro-services.

```shell
docker compose down
```

---

[Go to README](../README.md)
