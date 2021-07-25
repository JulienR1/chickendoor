import { SocketChannels } from "@shared/constants/socketChannels";
import http from "http";
import { Server, ServerOptions, Socket } from "socket.io";

import { onConnect as onClientConnect } from "./clientSocket";
import { onConnect as onDoorConnect } from "./doorSocket";
import { SocketType } from "./socketType";

const socketSettings: Partial<ServerOptions> = { cors: { credentials: true } };

let io: Server;
const allSocketIds: { [key in SocketType]: string[] } = { door: [], client: [] };

const initSocket = (server: http.Server): void => {
	io = new Server(server, socketSettings);
	io.on(SocketChannels.Connect, addNewSocket);
};

const addNewSocket = (socket: Socket) => {
	socket.on(SocketChannels.ClientConnect, () => addNewSocketWithType(socket, SocketType.Client));
	socket.on(SocketChannels.DoorConnect, () => addNewSocketWithType(socket, SocketType.Door));
};

const addNewSocketWithType = (socket: Socket, type: SocketType) => {
	socket.on(SocketChannels.Disconnect, () => onDisconnect(socket.id, type));
	allSocketIds[type].push(socket.id);
	console.log(`A socket of type '${type}' has connected`);

	if (type === SocketType.Door) {
		onDoorConnect(socket);
	} else if (type === SocketType.Client) {
		onClientConnect(socket);
	}
};

const onDisconnect = (socketId: string, type: SocketType) => {
	const index = allSocketIds[type].indexOf(socketId);
	if (index >= 0) {
		allSocketIds[type].splice(index, 1);
		console.log(`A socket of type ${type}' has disconnected`);
	}
};

export { initSocket };
