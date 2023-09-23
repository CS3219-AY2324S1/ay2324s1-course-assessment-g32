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

## Temporary Setup for Assignment 5

1. Download and install [Erlang](https://www.erlang.org/downloads)
2. Download and install [RabbitMQ](https://www.rabbitmq.com/download.html)
3. npm install and run backend and frontend as per normal
4. In another terminal, `cd backend\server\services` and run `nodemon matchService`
5. Use postman to send a POST request to `http://localhost:3001/queue/join` with the following JSON body:
```
{
  "complexityType": "Easy",
  "id": "1"
}

--Note: complexityType can be "Easy", "Medium" or "Hard" and id can be any number
```
6. In the terminal running matchService, you should see console messages indicating that a match has been found

*Optional: To view and clear the status of queues during debugging, you can run
 `rabbitmq-plugins enable rabbitmq_management` in RabbitMQ Command Prompt (sbin dir).
Go to `http://localhost:15672/` in your browser, login with default user `guest` and password `guest`*


## Setup MySQL locally

1. Search for **MySQL 8.1 Command Line Client** on your computer. Execute it to open up the terminal.
2. Enter your root password.
3. Run the SQL statements in `./backend/schema.sql` on the terminal.

## Setup environment variables

1. Enter the following command
```cp template.env .env```
1. Open `.env` file
1. Enter root password (previously configured when installing MySQL)  
   Example: if your root password is "password1234", 
   `MY_SQL_PWD=password1234`

## Install NodeJS packages

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

# Developer Notes

| Backend API Path | Purpose | Parameters (JSON format) |
| --- | --- | --- |
|`/auth/signup`| See `/user/create` | See `/user/create` |
|`/auth/login`| Used to login | `email` <br> `password` |
|`/user/create`| Used to create new user | `email` <br> `password` <br> `confirmPassword` |
|`/user/read`| Used to get user info | `id` or `email` |
|`/user/update`| Used to update user info (username, password) | `id` <br> `username` or `password` |
|`/user/delete`| Used to delete user | `id` |
|`/user/change-password`|Used to change user password|`id` <br> `currentPassword` <br> `newPassword` <br> `confirmPassword` |
