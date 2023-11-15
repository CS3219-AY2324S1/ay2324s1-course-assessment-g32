# Setup Redis Locally

For Windows,

1. Download and install [Ubuntu](https://ubuntu.com/download/desktop)
  - It is recommended to install the 64-bit version
2. Install [Redis](https://redis.io/docs/install/install-redis/install-redis-on-windows/) server
  - You can follow the instructions given
    - Port should be `6379`

For Mac OS,

1. Install [Homebrew](https://brew.sh/)
2. Install [Redis](https://redis.io/docs/install/install-redis/install-redis-on-mac-os/)

# Start Redis Service

For Windows,

1. Start your Ubuntu terminal
2. To start service: `redis-server` into the terminal
3. Leave the terminal running

For Mac OS,

1. Open your terminal
2. To start service: `brew services start redis` into the terminal
3. Leave the terminal running
4. Remember to stop the service after you are done using PeerPrep: `brew services stop redis`

---

[Go to README](../README.md)
