import { SocketList } from "@root/models/socketList";
import { SocketChannel } from "@shared/constants/socketChannel";
import { IRegisteredDoors } from "@shared/models/registeredDoors";
import { Server, Socket } from "socket.io";

import { onConnect as onClientConnect } from "./client";
import { onConnect as onDoorConnect } from "./door";
import { SocketType } from "./socketType";

let io: Server;
export const allSocketIds: SocketList = { door: [], client: [] };

export const setServer = (server: Server): void => {
	io = server;
	io.on(SocketChannel.Connect, addNewSocket);
};

export const addNewSocket = (socket: Socket): void => {
	socket.on(SocketChannel.ClientConnect, () => addNewSocketWithType(socket, SocketType.Client));
	socket.on(SocketChannel.DoorConnect, () => addNewSocketWithType(socket, SocketType.Door));
};

export const addNewSocketWithType = (socket: Socket, type: SocketType): void => {
	if (!socket) {
		throw Error("The provided socket was undefined");
	}

	socket.on(SocketChannel.Disconnect, () => onDisconnect(socket.id, type));
	allSocketIds[type].push(socket.id);
	console.log(`A socket of type '${type}' has connected`);

	notifyRegisteredDoors();
	if (type === SocketType.Door) {
		onDoorConnect(socket);
	} else if (type === SocketType.Client) {
		socket.on(SocketChannel.RegisteredDoors, notifyRegisteredDoors);
		onClientConnect(socket);
	}
};

export const onDisconnect = (socketId: string, type: SocketType): void => {
	const index = allSocketIds[type].indexOf(socketId);
	if (index >= 0) {
		allSocketIds[type].splice(index, 1);
		console.log(`A socket of type ${type}' has disconnected`);
	}
	if (type === SocketType.Door) {
		notifyRegisteredDoors();
	}
};

export const sendToSocketList = (socketIdList: string[], dataToSend: string | null, channel: SocketChannel): void => {
	socketIdList.forEach((socketId) => {
		io.to(socketId).emit(channel, dataToSend);
	});
};

export const notifyRegisteredDoors = (): void => {
	const dataToSend: IRegisteredDoors = { doorAreRegistered: allSocketIds.door.length > 0 };
	sendToSocketList(allSocketIds.client, JSON.stringify(dataToSend), SocketChannel.RegisteredDoors);
};
