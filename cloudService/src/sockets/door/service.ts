import { writeToFile } from "@root/storage";
import { Files } from "@root/storage/files";
import { SocketChannel } from "@shared/constants/socketChannel";
import { DoorData, isValid, sanitize } from "@shared/models/doorData";

import { sendToClientSockets } from "../sockets";

const saveNewDoorData = (newDoorData: DoorData): void => {
	const doorData = sanitize(newDoorData);

	if (isValid(doorData)) {
		writeToFile(Files.DoorData, JSON.stringify(doorData));
		sendToClientSockets(JSON.stringify(doorData), SocketChannel.NotifyDoorState);
	} else {
		// TODO
		console.error("The received data was not proper. It has been refused and no updates were sent");
	}
};

export { saveNewDoorData };
