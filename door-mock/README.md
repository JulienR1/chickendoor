# Door Mock

This part of the project is a simple website that offers a few controls that mimic the behavior of the microcontroller. It offers a more simple testing environment and is meant to be operated by the developer.

It connects to the sockets provided by the [CloudService](../cloudService/README.md).

## Commands

`npm run serve`: Locally host the testing website on port 3001

## Functionnalities

The mock allows to:

- Establish or destroy the connection to the server
- Fetching the next planned update
- Send a custom state to the server
- Listen to events on specific channels

### Socket connection

To enable any communication with the server, it needs to be connected. This state is controlled via the `Connect` and `Disconnect` buttons. The current state is grayed out.

If the server remotly terminates the connection, the mock will automatically disconnect.

### Fetching the next planned update

This queries the server and prints out the necessary information to automatically after the door in the correct amount of time.

### Sending a custom state

Sends the specified state data in the form to the server as a JSON string upon request. This enables to respond to a request from the server or push an update when necessary.

### Listening to events

The mock listens to all specified channels and prints out their content when a message is received. If there is none, it will print out a notification.

To bind the mock to a new channel, its name must be added in [`channels.js`](./src/channels.js).
