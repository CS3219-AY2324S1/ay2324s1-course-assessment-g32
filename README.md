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

## Setup environment variables

1. Enter the following command

```
cp template.env .env
```

1. Open `.env` file
1. Enter root password (previously configured when installing MySQL)  
   Example: if your root password is "password1234",
   `MY_SQL_PWD=password1234`

## Install NodeJS packages

```
npm install install-all
```

then

```
npm run install-all
```

# Start Application

Start local MySQL Server (Windows Service), if necessary.

Start all services by:

```
npm run start-all
```

Or start them indvidually:

- Frontend: `cd frontend && npm start`
- Backend: `cd backend && npm start`

URL for frontend: `http://localhost:3000/`

# Developer Notes

| Backend API Path               | Method | Purpose                                           | Parameters (JSON format)                                              |
| ------------------------------ | ------ | ------------------------------------------------- | --------------------------------------------------------------------- |
| `/question/create`             | POST   | Used to create new question                       | `title` <br> `complexity` <br> `description` <br> `tags`              |
| `/question/delete`             | DELETE | Used to delete question                           | `id`                                                                  |
| `/question/edit`               | POST   | Used to edit question                             | `id` <br> `title` <br> `complexity` <br> `description` <br> `tags`    |
| `/question/getAll`             | GET    | Used to get all the questions from the database   | -                                                                     |
| `/question/getQuestionDetails` | GET    | Used to get the details of the specified question | `id`                                                                  |
| `/user/change-password`        | POST   | Used to change user password                      | `id` <br> `currentPassword` <br> `newPassword` <br> `confirmPassword` |
| `/user/delete`                 | POST   | Used to delete user                               | `id`                                                                  |
| `/user/login`                  | POST   | Used to login                                     | `email` <br> `password`                                               |
| `/user/read`                   | POST   | Used to get a user information                    | `id` or `email`                                                       |
| `/user/readAll`                | GET    | Used to get all users information                 | -                                                                     |
| `/user/signup`                 | POST   | Used to create new user                           | `email` <br> `password` <br> `confirmPassword`                        |
| `/user/update`                 | POST   | Used to update user information (username)        | `id` <br> `username`                                                  |

- `question` API contains all the question data related endpoints.
- `user` API contains all the user data related endpoints.
- All API are running on port 3001.
- Note that if the API path requires JWT token to be in the header, it means the user has to be logged in.
