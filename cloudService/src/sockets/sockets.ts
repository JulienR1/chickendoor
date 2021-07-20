import http from "http";
import { Server, ServerOptions, Socket } from "socket.io";
import { CustomSocket } from "./customSocket";
import { SocketChannels } from "./socketChannels";
import { SocketType } from "./socketType";

const socketSettings: Partial<ServerOptions> = { cors: { credentials: true } };

let io: Server;
const allSockets: { [key in SocketType]: CustomSocket[] } = { door: [], client: [] };

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
	socket.on(SocketChannels.Disconnect, () => onDisconnect(customSocket));
	allSockets[type].push(customSocket);
	console.log(`A socket of type '${type}' has connected`);
	// TODO: add events to socket based on type
};

const onDisconnect = (socket: CustomSocket) => {
	const index = allSockets[socket.type].indexOf(socket);
	if (index >= 0) {
		allSockets[socket.type].splice(index, 1);
		console.log(`A socket of type ${socket.type}' has disconnected`);
	}
};

export { initSocket };
