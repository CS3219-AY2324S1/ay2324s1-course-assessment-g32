[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/6BOvYMwN)

> [!IMPORTANT]
> Do _not_ test while on NUS grounds or connected
> (either directly or indirectly) to NUS Wifi.\
> (NUS networks blocks MongoDB Atlas which is required by our application.)

# Application Installation and Setup

Click for instructions for the respective modes:

- [Running Locally](docs/LocalHosting)
- [Running via Docker](docs/Containerization)

# Resources for Developer / Tester

## Software

For development, you may also want to install:

- [MongoDB Compass](https://www.mongodb.com/try/download/compass)
- [Docker Desktop](https://www.docker.com/get-started/)
- [Postman](https://www.postman.com/downloads/)

## Documentation

- [API Endpoints](docs/ApiEndpoints.md)
- [Local Setup for RabbitMQ Server](docs/LocalRabbitMqSetup)
- [Local Setup for Redis Server](docs/LocalRedisSetup)
- [Containerization](docs/Containerization)
- [Test Accounts](docs/TestAccounts)

## Micro-services

You can start individual services separately to test them.

However, as there are dependencies among the services,
they might not function normally standalone.

Run them in different terminals:

- Auth service: `npm run start:auth`
- User service: `npm run start:user`
- Question service: `npm run start:question`
- Match service: `npm run start:match`
- Collaboration Service: `npm run start:collab`
- History Service: `npm run start:history`
- Execution Service: `npm run start:execution`
- Frontend: `npm run start:frontend`

---

**For clarifications, do leave your questions at [Feedback PR](https://github.com/CS3219-AY2324S1/ay2324s1-course-assessment-g32/pull/1) created in our repository.**
