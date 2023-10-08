[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/6BOvYMwN)

# Software Requirements

Download and install these software if you do not have them locally.

- [NodeJS](https://nodejs.org/en/download)
- [MySQL](https://dev.mysql.com/downloads/mysql/)

For development, you may also want to install:

- [MongoDB Compass](https://www.mongodb.com/try/download/compass)
- [Docker Desktop](https://www.docker.com/get-started/)
- [Postman](https://www.postman.com/downloads/)

# Setup

## Setup MySQL locally

1. Search for **MySQL 8.1 Command Line Client** on your computer. Execute it to open up the terminal.
2. Enter your root password.
3. Run the SQL statements in `./backend/schema.sql` on the terminal.
4. Run the SQL statements in `./Auth/schema.sql` on the terminal.

## Setup environment variables

1. Enter the following command
   `cp template.env .env`
1. Open `.env` file
1. Enter root password (previously configured when installing MySQL)  
   Example: if your root password is "password1234",
   `MY_SQL_PWD=password1234`

## Install NodeJS packages

```
npm i install-all && npm run install-all && cd Auth && npm i
```

# Start Application

Start local MySQL Server (Windows Service), if necessary.

Start all services by:

```
npm run start-all && cd Auth && npm run dev

```

Or start them indvidually:

- Frontend: `cd frontend && npm start`
- Backend: `cd backend && npm start`
- Auth service: `cd Auth && npm run dev`

# Developer Notes

| Backend API Path               | Purpose                                             | Parameters (JSON format)                                              | Require JWT token to be in header? | Does user have to be maintainer? |
| ------------------------------ | --------------------------------------------------- | --------------------------------------------------------------------- | ---------------------------------- | -------------------------------- |
| `/auth/authorize`              | Used to authorize all users                         | -                                                                     | Yes                                | No                               |
| `/auth/authorizeMaintainer`    | Used to authorize maintainers                       | -                                                                     | Yes                                | Yes                              |
| `/auth/generate`               | Used to generate JWT token after user has logged in | `userId` <br> `isMaintainer`                                          | No                                 | -                                |
| `/question/create`             | Used to create new question                         | `title` <br> `complexity` <br> `description` <br> `tags`              | Yes                                | Yes                              |
| `/question/delete`             | Used to delete question                             | `id`                                                                  | Yes                                | Yes                              |
| `/question/edit`               | Used to edit question                               | `id` <br> `title` <br> `complexity` <br> `description` <br> `tags`    | Yes                                | Yes                              |
| `/question/getAll`             | Used to get all the questions from the database     | -                                                                     | Yes                                | No                               |
| `/question/getQuestionDetails` | Used to get the details of the specified question   | `id`                                                                  | Yes                                | No                               |
| `/user/change-password`        | Used to change user password                        | `id` <br> `currentPassword` <br> `newPassword` <br> `confirmPassword` | Yes                                | No                               |
| `/user/delete`                 | Used to delete user                                 | `id`                                                                  | Yes                                | No                               |
| `/user/login`                  | Used to login                                       | `email` <br> `password`                                               | No                                 | -                                |
| `/user/read`                   | Used to get user information                        | `id` or `email`                                                       | Yes                                | No                               |
| `/user/readAll`                | Used to get all users information                   | -                                                                     | Yes                                | Yes                              |
| `/user/signup`                 | Used to create new user                             | `email` <br> `password` <br> `confirmPassword`                        | No                                 | -                                |
| `/user/update`                 | Used to update user information (username)          | `id` <br> `username`                                                  | Yes                                | No                               |

- `auth` API contains all the authorization related endpoints.
- `question` API contains all the question data related endpoints.
- `user` API contains all the user data related endpoints (including authentication).
- Note that if the API path requires JWT token to be in the header, it means the user has to be logged in.
