import { Files } from "@root/storage/files";
import { writeToFile } from "@root/storage/storage";
import { SocketChannel } from "@shared/constants/socketChannel";
import { DoorData, isValid, sanitize } from "@shared/models/doorData";
import { Socket } from "socket.io";

import { sendToClientSockets } from "./sockets";

export const onConnect = (socket: Socket): void => {
	socket.on(SocketChannel.RequestDoorState, onNewDataFromDoor);
};

const onNewDataFromDoor = (dataStr: string) => {
	const dataToSanitize: DoorData = JSON.parse(dataStr);
	const doorData = sanitize(dataToSanitize);

	if (isValid(doorData)) {
		writeToFile(Files.DoorData, JSON.stringify(doorData));
		sendToClientSockets(JSON.stringify(doorData), SocketChannel.NotifyDoorState);
	} else {
		// TODO
		console.error("The received data was not proper. It has been refused and no updates were sent");
	}
};
