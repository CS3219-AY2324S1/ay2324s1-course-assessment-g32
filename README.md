[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/6BOvYMwN)

# Software Requirements

Download and install these software if you do not have them locally.
- NodeJS
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
```cd backend && cp template.env .env```
1. Open `./backend/.env` file
1. Enter root password (previously configured when installing MySQL)  
   Example: if your root password is "password1234", 
   `MY_SQL_PWD=password1234`


## Install NodeJS packages

```
cd frontend && start npm install && cd ..
cd backend && start npm install && cd ..

```

# Start Application

Start local MySQL Server

Start all services by: 
```
cd frontend && start npm start && cd ..
cd backend && start npm start && cd ..

```
Or start them indvidually:  
- Frontend: `cd frontend && npm start`  
- Backend: `cd backend && npm start`  
