import { minimumTimeBetweenDoorRefreshes } from "@root/globals";
import { IStoredContent } from "@root/models/storedContent";
import { SocketChannel } from "@shared/constants/socketChannel";
import { DoorData } from "@shared/models/doorData";

import { sendToClientSockets, sendToDoorSockets } from "../sockets";

const updateClientDoorData = (doorData: IStoredContent<DoorData> | undefined) => {
	if (doorData?.new) {
		sendToClientSockets(JSON.stringify(doorData), SocketChannel.NotifyDoorState);
	}
};

const requestNewDoorData = (oldDoorData: IStoredContent<DoorData> | undefined) => {
	if (oldDoorData?.new.timestamp) {
		const elapsedTime = Date.now() - new Date(oldDoorData?.new.timestamp).getTime();

		if (elapsedTime <= minimumTimeBetweenDoorRefreshes) {
			return;
		}
	}

	sendToDoorSockets(null, SocketChannel.RequestDoorState);
};

export { requestNewDoorData,updateClientDoorData };
