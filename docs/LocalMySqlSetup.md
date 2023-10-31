# Setup MySQL Locally

## Install MySQL on Computer

- Download and install [MySQL](https://dev.mysql.com/downloads/mysql/)
- You can use the default settings given
  - Port should be `3306`
  - Note the root password that you set (you will need it later)

For macOS, additonal steps (to set the PATH) might be required to be able to use `mysql` in the terminal.
You can follow the steps mentioned in this [video tutorial](https://youtu.be/-BDbOOY9jsc?t=253).

## Start MySQL Service

For Windows OS,

1. `Win + R` to open the Run window
2. Type `services.msc` into the Run window
3. Press `Ctrl + Shift + Enter` to **run as administrator**
4. If prompted by _User Account Control_, enter administrator password
5. In the Services application, search for the MySQL Service
   (eg. _MYSQL81_ for MySQL 8.1)
6. Check _Status_ of the service
   - Running: OK, no further action needed
   - Blank: Need to be started, do the next step
7. Right click on the MySQL Service and press `Start`

For macOS,

1. Click on the apple icon on the top left of the screen
2. Click on `System Settings` to open System Settings
3. Search for `MySQL`
4. Click `Start MySQL Server` if it has not been started

## Open MySQL Terminal

For Windows OS,

1. Search for _MySQL 8.1 Command Line Client_ on your computer
2. Execute it to open up the terminal
3. Enter your root password (which you set during installation)

For macOS,

1. Open a terminal
2. Type `mysql -u root -p` and press `Enter`
3. Enter your root password (which you set during installation)

## Setup required database

1. Run the SQL statements in `./User/initdb/01-schema.sql`
2. Optionally, if you want sample accounts to use, run SQL statements
   in `./User/initdb/03-sample-accts.sql`

> Quick Tip!\
> In the terminal, you can quickly run the SQL statements by doing\
> `source path_to_schema.sql`\
> For example,\
> `source C:\Users\User\PeerPrep\User\initdb\01-schema.sql`

---

[Go to README](../README.md)
