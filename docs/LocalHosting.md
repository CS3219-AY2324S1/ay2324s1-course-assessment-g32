# Local Setup

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

Follow the steps in [Setup MySQL locally](LocalMySqlSetup.md).

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

# Start Application Locally

Ensure that MySQL Server service has started.
(How to check? Click [here](LocalMySqlSetup.md#start-mysql-service).)

Start all services using the following commands:

```
npm run start-all
```

---
[Go to README](../README.md)
