# Shared

### Communication channels

| Channel          | Description                                                                                         |
| ---------------- | --------------------------------------------------------------------------------------------------- |
| Connect          | Whenever a client connects to the server                                                            |
| Disconnect       | Whenever a connection is lost                                                                       |
| DoorConnect      | Fired once upon connection from a door process to inform the server who connected                   |
| ClientConnect    | Fired once upon connection from a web app process to inform the server who connected                |
| RequestDoorState | Used by the **server** and any instance of the **web app** to request an update of the door's state |
| NotifyDoorState  | Used by the **server** and any instance of the **door process** to get the realtime state           |
