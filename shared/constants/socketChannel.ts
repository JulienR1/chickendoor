export enum SocketChannel {
	Connect = "connection",
	Disconnect = "disconnect",

	DoorConnect = "doorConnect",
	ClientConnect = "clientConnect",

	RequestDoorState = "requestDoorState",
	NotifyDoorState = "notifyDoorState",
}
