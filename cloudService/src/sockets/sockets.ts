import http from "http";
import { Server, ServerOptions, Socket } from "socket.io";
import { CustomSocket } from "./customSocket";
import { SocketChannels } from "./socketChannels";
import { SocketType } from "./socketType";

const socketSettings: Partial<ServerOptions> = { cors: { credentials: true } };

let io: Server;
const connectedSockets: CustomSocket[] = [];

const initSocket = (server: http.Server) => {
	io = new Server(server, socketSettings);
	io.on(SocketChannels.Connect, addNewSocket);
};

const addNewSocket = (socket: Socket) => {
	socket.on(SocketChannels.ClientConnect, () => addNewSocketWithType(socket, SocketType.Client));
	socket.on(SocketChannels.DoorConnect, () => addNewSocketWithType(socket, SocketType.Door));
};

const addNewSocketWithType = (socket: Socket, type: SocketType) => {
	const customSocket: CustomSocket = { socketId: socket.id, type };
	socket.on(SocketChannels.Disconnect, () => onDisconnect(socket));
	connectedSockets.push(customSocket);
	console.log(`A socket of type '${SocketType[type]}' has connected`);
};

const onDisconnect = (socket: Socket) => {
	const index = connectedSockets.findIndex((customSocket) => customSocket.socketId === socket.id);
	if (index >= 0) {
		const customSocket: CustomSocket = { ...connectedSockets[index] };
		connectedSockets.splice(index, 1);
		console.log(`A socket of type '${SocketType[customSocket.type]}' has disconnected`);
	}
};

export { initSocket, connectedSockets };
