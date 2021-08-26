import { SocketChannel } from "@shared/constants/socketChannel";
import { DoorData } from "@shared/models/doorData";
import { Socket } from "socket.io";

import { saveNewDoorData } from "./service";

export const onConnect = (socket: Socket): void => {
	socket.on(SocketChannel.RequestDoorState, onNewDataFromDoor);
};

const onNewDataFromDoor = (dataStr: string) => {
	const dataToSanitize: DoorData = JSON.parse(dataStr);
	saveNewDoorData(dataToSanitize);
};
