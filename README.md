[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/6BOvYMwN)

We have various micro-services including:

- MySQL Database
- User Service
- Auth Service
- Question Service
- Frontend Service (Web UI)

Additional Notes:

If you are not using Windows OS, and would like a equivalent instruction for a differnt OS, do reach out to us for clarification.

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
- [Erlang](https://www.erlang.org/downloads)
- [RabbitMQ](https://www.rabbitmq.com/download.html)

For development, you may also want to install:

- [MongoDB Compass](https://www.mongodb.com/try/download/compass)
- [Docker Desktop](https://www.docker.com/get-started/)

**Ensure that MySQL Server is NOT running locally.**

## Setup MySQL locally

For clarity, the commands given below should be executed at the root directory if not specified otherwise.

_The commands below are provided for convenience and may be incorrect.
Do reach out to us for clarification if necessary._

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

- Frontend: `cd frontend && npm start`
- Backend: `cd backend && npm start`
- Auth service: `cd Auth && npm start`
- Question service: `cd Question && npm start`
- User service: `cd User && npm start`
- Match service: `cd Match && npm start`

To check that the daemon has started, open a terminal and check the version.

| Method | API Endpoints                           | Purpose                                                   | Parameters <br> (JSON format)                                         | Require JWT token to be in header? | Does user have to be maintainer? |
| ------ | --------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------------------- | ---------------------------------- | -------------------------------- |
| GET    | `/auth/authorize`                       | Used to authorize all users                               | -                                                                     | Yes                                | No                               |
| GET    | `/auth/authorizeMaintainer`             | Used to authorize maintainers                             | -                                                                     | Yes                                | Yes                              |
| POST   | `/auth/generate`                        | Used to generate JWT token after user has logged in       | `userId` <br> `isMaintainer`                                          | No                                 | -                                |
| POST   | `/question/create`                      | Used to create new question                               | `title` <br> `complexity` <br> `description` <br> `tags`              | Yes                                | Yes                              |
| DELETE | `/question/delete`                      | Used to delete question                                   | `id`                                                                  | Yes                                | Yes                              |
| POST   | `/question/edit`                        | Used to edit question                                     | `id` <br> `title` <br> `complexity` <br> `description` <br> `tags`    | Yes                                | Yes                              |
| GET    | `/question/getAll`                      | Used to get all the questions from the database           | -                                                                     | Yes                                | No                               |
| GET    | `/question/getAllByComplexity`          | Used to get all the questions of the specified complexity | `complexity`                                                          | Yes                                | No                               |
| GET    | `/question/getQuestionDetails`          | Used to get the details of the specified question         | `id`                                                                  | Yes                                | No                               |
| GET    | `/question/getRandomQuestionByCriteria` | Used to get a random question of the specified criteria   | `complexity`                                                          | Yes                                | No                               |
| POST   | `/user/change-password`                 | Used to change user password                              | `id` <br> `currentPassword` <br> `newPassword` <br> `confirmPassword` | Yes                                | No                               |
| POST   | `/user/delete`                          | Used to delete user                                       | `id`                                                                  | Yes                                | No                               |
| POST   | `/user/login`                           | Used to login                                             | `email` <br> `password`                                               | No                                 | -                                |
| POST   | `/user/read`                            | Used to get user information                              | `id` or `email`                                                       | Yes                                | No                               |
| GET    | `/user/readAll`                         | Used to get all users information                         | -                                                                     | Yes                                | Yes                              |
| POST   | `/user/signup`                          | Used to create new user                                   | `email` <br> `password` <br> `confirmPassword`                        | No                                 | -                                |
| POST   | `/user/update`                          | Used to update user information (username)                | `id` <br> `username`                                                  | Yes                                | No                               |
| POST   | `/queue/join`                           | Used to join the matching queue                           | `queueName` <br> `sessionID`                                          | Yes                                | No                               |
| POST   | `/queue/exit`                           | Used to exit the matching queue                           | `queueName` <br> `sessionID`                                          | Yes                                | No                               |

- `user` API (port 4001) contains all the user data related endpoints (including authentication).
- `auth` API (port 5001) contains all the authorization related endpoints.
- `question` API (port 6001) contains all the question data related endpoints.
- `match` API (port 7001) contains all the match related endpoints.
- `collab` API (port 8001) contains all the collaboration related endpoints.
- Note that if the API path requires JWT token to be in the header, it means the user has to be logged in.
