# Setup RabbitMQ Locally

## Install Erlang on Computer

- Download and install [Erlang](https://www.erlang.org/downloads) before you install the
  [RabbitMQ](https://www.rabbitmq.com/download.html) server
- For Windows OS, it is recommended to install the 64-bit version

## Install RabbitMQ on Computer

- Download and install [RabbitMQ](https://www.rabbitmq.com/download.html) server
- You can use the default settings given
  - Port should be `5672`

## Start RabbitMQ Service

For Windows OS,

1. `Win + R` to open the Run window
2. Type `services.msc` into the Run window
3. Press `Ctrl + Shift + Enter` to **run as administrator**
4. If prompted by _User Account Control_, enter administrator password
5. In the Services application, search for the RabbitMQ Service
6. Check _Status_ of the service
   - Running: OK, no further action needed
   - Blank: Need to be started, do the next step
7. Right click on the RabbitMQ Service and press `Start`

For macOS,

1. Click on the apple icon on the top left of the screen
2. Click on `System Settings` to open System Settings
3. Search for `RabbitMQ`
4. Click `Start RabbitMQ Server` if it has not been started

## Open RabbitMQ Management Browser

- RabbitMQ offers a convenient and user-friendly way to perform various administrative tasks
  and monitor the RabbitMQ message broker through the [RabbitMQ Management Browser](http://localhost:15672/#/)
- You can login through the default administrator account at
  - Username: `guest`
  - Password: `guest`

---

[Go to README](../README.md)
