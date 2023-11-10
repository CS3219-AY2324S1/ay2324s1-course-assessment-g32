# Local Setup

## Software Requirements

Download and install these software if you do not have them locally.

- [NodeJS](https://nodejs.org/en/download)
- [Erlang](https://www.erlang.org/downloads)
- [RabbitMQ](https://www.rabbitmq.com/download.html)
- [Ubuntu](https://ubuntu.com/download/desktop)
- [Redis](https://redis.io/download)

## Internet Access

Ensure that you are connected to the internet.

> [!IMPORTANT]
> Do **not** connect to NUS Wifi/Network.\
> The application would be unable to connect to MongoDB Atlas.

## Setup RabbitMQ locally

Follow the steps in [Setup RabbitMQ locally](LocalRabbitMqSetup.md).
Follow the steps in [Setup Redis locally](LocalRedisSetup.md).

## Setup environment variables

1. At the root directory, open a terminal
2. Duplicate `template.env` as `.env`
   ```
   cp template.env .env
   ```
3. Open `.env` file 
4. Fill up a JWT token password
   (for generating and decoding JWT tokens)
    - Example: if you want to set the password to "password",
      `JWT_SECRET_KEY=password`

## Install NodeJS packages

```
npm run install-all
```

# Start Application Locally

Start all services using the following commands:

```
npm run start-all
```

---

[Go to README](../README.md)
