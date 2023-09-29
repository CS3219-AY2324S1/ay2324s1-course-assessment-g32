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

| Backend API Path        | Purpose                                       | Parameters (JSON format)                                              |
| ----------------------- | --------------------------------------------- | --------------------------------------------------------------------- |
| `/auth/signup`          | See `/user/create`                            | See `/user/create`                                                    |
| `/auth/login`           | Used to login                                 | `email` <br> `password`                                               |
| `/user/create`          | Used to create new user                       | `email` <br> `password` <br> `confirmPassword`                        |
| `/user/read`            | Used to get user info                         | `id` or `email`                                                       |
| `/user/update`          | Used to update user info (username, password) | `id` <br> `username` or `password`                                    |
| `/user/delete`          | Used to delete user                           | `id`                                                                  |
| `/user/change-password` | Used to change user password                  | `id` <br> `currentPassword` <br> `newPassword` <br> `confirmPassword` |
