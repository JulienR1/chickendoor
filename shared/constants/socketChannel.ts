export enum SocketChannel {
	Connect = "connection",
	Disconnect = "disconnect",

	DoorConnect = "doorConnect",
	ClientConnect = "clientConnect",
	RegisteredDoors = "registeredDoors",

	RequestDoorState = "requestDoorState",
	NotifyDoorState = "notifyDoorState",
}
