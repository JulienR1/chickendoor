import { SocketChannels } from "@shared/constants/socketChannels";
import { sanitize, isValid, DoorData } from "@shared/models/doorData";
import { Socket } from "socket.io";

export const onConnect = (socket: Socket): void => {
	socket.on(SocketChannels.RequestDoorState, onNewDataFromDoor);
};

const onNewDataFromDoor = (dataStr: string) => {
	const dataToSanitize: DoorData = JSON.parse(dataStr);
	const doorData = sanitize(dataToSanitize);

	if (isValid(doorData)) {
		// SAVE IN LOCAL STATE WITH TIMESTAMP SO THAT WE DONT SPAM WHEN REQUESTING INFO (10s interval?)
		// DISPATCH TO EVERY CLIENT CONNECTED TO THE SERVER (data, socketId)
	} else {
		// TODO
		console.error("The received data was not proper. It has been refused and no updates were sent");
	}
};
