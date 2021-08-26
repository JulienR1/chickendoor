import { SocketType } from "@root/sockets/socketType";

export type SocketList = {
	[key in SocketType]: string[];
};
