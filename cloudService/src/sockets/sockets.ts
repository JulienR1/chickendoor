import { SocketChannel } from "@shared/constants/socketChannel";
import http from "http";
import { Server, ServerOptions } from "socket.io";

import { allSocketIds, sendToSocketList, setServer } from "./service";

const socketSettings: Partial<ServerOptions> = { cors: { credentials: true } };

const initSocket = (server: http.Server): void => {
	setServer(new Server(server, socketSettings));
};

const sendToDoorSockets = (dataToSend: string | null, channel: SocketChannel): void => {
	sendToSocketList(allSocketIds.door, dataToSend, channel);
};

const sendToClientSockets = (dataToSend: string | null, channel: SocketChannel): void => {
	sendToSocketList(allSocketIds.client, dataToSend, channel);
};

export { initSocket, sendToClientSockets, sendToDoorSockets };
