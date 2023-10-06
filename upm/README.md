# User Profile Management

User Profile Management (UPM) is a standalone application
to manage user profiles.

Features:
* View all users
* Create new user
* Edit user details
  * Change Username
  * Change Password <**!! Dangerous !!**>
* Delete any existing user 

UPM is **not** secure; not authentication or authorization
verification is being done. It is running is a "always-admin"
mode, meaning that any/all actions done can potentially be
dangerous.

**Warning:** _UPM is in "god-mode"! It must not be used by the
end-user directly!_

Note: to make it harder "accidentially" start and abuse UPM,
UPM _must_ be set up and start seperately. The parent package
will not install/start UPM. UPM _must_ be started explicitly.

Components:
* [Web Interface](#web-interface)
* [Backend Server](#backend-server)
* [User Database](#user-database)

Usage:
* [Setup](#setup)
* [Start Application](#start-application)

## Web Interface

A basic UI to display the required information, and buttons to take actions.

Uses a RESTful API to communicate with the backend server.

## Backend Server

Manages any request CRUD to the database.

Business Logic: check and verify inputs are as expected before
proceeding to change the database. 

## User Database

UPM expects a MySQL database which stores the users.

This is the only part which is not standlone. The database is expected to be shared with other applications/services. _This may change due to future intergration_.

## Setup

### User Database

Read README in parent package.

### Install Packages

Inside `/upm` directory,

```shell
npm install
```

## Start Application

Inside `/upm` directory,

```shell
npm start
```

This will open an additional terminal which runs the backend server,
as well as start the web interface server.

Note: When terminating, need to close the additional terminal separately.
