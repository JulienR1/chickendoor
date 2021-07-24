# CloudService

This part of the project is a NodeJS server running on Heroku that handles the communication between the front-end and the esp32.

It is based on [ExpressJS](https://expressjs.com/) and [Socket.io](https://socket.io/).

## Commands

`npm run dev`: Starts a watching server for development purposes with nodemon (default port: 8080)

`npm run build`: Validates the code syntax, tests and builds the app

`npm run start`: Runs the built app (default port: 8080)
