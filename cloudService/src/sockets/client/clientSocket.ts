import { Files } from "@root/storage/files";
import { readFileAsJSON } from "@root/storage/storage";
import { SocketChannel } from "@shared/constants/socketChannel";
import { DoorData } from "@shared/models/doorData";
import { Socket } from "socket.io";

import { requestNewDoorData, updateClientDoorData } from "./service";

export const onConnect = (socket: Socket): void => {
	socket.on(SocketChannel.NotifyDoorState, onNotifyDoorState);
};

const onNotifyDoorState = () => {
	const savedData = readFileAsJSON<DoorData>(Files.DoorData);
	updateClientDoorData(savedData);
	requestNewDoorData(savedData);
};
