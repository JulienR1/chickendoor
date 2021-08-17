import { IStoredContent } from "@root/models/storedContent";
import { Files } from "@root/storage/files";
import { readFile } from "@root/storage/storage";
import { SocketChannel } from "@shared/constants/socketChannel";
import { DoorData } from "@shared/models/doorData";
import { Socket } from "socket.io";

import { sendToClientSockets, sendToDoorSockets } from "./sockets";

export const onConnect = (socket: Socket): void => {
	socket.on(SocketChannel.NotifyDoorState, onNotifyDoorState);
};

const onNotifyDoorState = () => {
	let savedData: IStoredContent<DoorData> | undefined;
	try {
		const savedDataStr = readFile(Files.DoorData);
		savedData = JSON.parse(savedDataStr);
	} catch (exception) {
		savedData = undefined;
	}

	if (savedData?.new) {
		sendToClientSockets(JSON.stringify(savedData.new), SocketChannel.NotifyDoorState);
	}
	if (savedData?.new.timestamp && Date.now() - new Date(savedData?.new.timestamp).getTime() > 10000) {
		sendToDoorSockets(null, SocketChannel.RequestDoorState);
	}
};
