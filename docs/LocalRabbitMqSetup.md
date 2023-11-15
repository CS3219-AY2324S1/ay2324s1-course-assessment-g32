# Setup RabbitMQ Locally

For Windows OS,  

1. Install Erlang on Computer

    - Download and install [Erlang](https://www.erlang.org/downloads) before you install the
  [RabbitMQ](https://www.rabbitmq.com/download.html) server
    - For Windows OS, it is recommended to install the 64-bit version

2. Install RabbitMQ on Computer

    - Download and install [RabbitMQ](https://www.rabbitmq.com/download.html) server
    - You can use the default settings given
      - Port should be `5672`

For Mac OS,

1. Install [Homebrew](https://brew.sh/)
2. Install [RabbitMQ](https://www.rabbitmq.com/install-homebrew.html)

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

For Mac OS,

1. Open your terminal
2. To start service: `brew services start rabbitmq` into the terminal
3. Leave the terminal running
4. Remember to stop the service after you are done using PeerPrep: `brew services stop rabbitmq`

## Open RabbitMQ Management Browser

- RabbitMQ offers a convenient and user-friendly way to perform various administrative tasks
  and monitor the RabbitMQ message broker through the [RabbitMQ Management Browser](http://localhost:15672/#/)
- You can login through the default administrator account at
  - Username: `guest`
  - Password: `guest`

---

[Go to README](../README.md)
