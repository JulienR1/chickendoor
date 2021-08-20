# Shared

### Communication channels

| Channel          | WebApp  | Server  | Door    | Description                                                   |
| ---------------- | ------- | ------- | ------- | ------------------------------------------------------------- |
| Connect          | &#9745; | &#9745; | &#9745; | Whenever a client connects to the server                      |
| Disconnect       | &#9745; | &#9745; | &#9745; | Whenever a connection is lost                                 |
| DoorConnect      | &#9744; | &#9744; | &#9745; | Fired once upon connection to inform the server who connected |
| ClientConnect    | &#9745; | &#9744; | &#9744; | Fired once upon connection to inform the server who connected |
| RegisteredDoors  | &#9745; | &#9745; | &#9744; | Used to notify when a door socket arrives or leaves           |
| RequestDoorState | &#9744; | &#9745; | &#9745; | Used to get the actual door state from the device             |
| NotifyDoorState  | &#9745; | &#9745; | &#9744; | Used to get the latest cached door state from the server      |
