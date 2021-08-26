import { SocketList } from "@root/models/socketList";
import { IStoredContent } from "@root/models/storedContent";
import { DoorMode } from "@shared/constants/doorMode";
import { DoorPosition } from "@shared/constants/doorPosition";
import { DoorData } from "@shared/models/doorData";
import { Socket } from "socket.io";

export const fillerDoorData: IStoredContent<DoorData> = {
	new: {
		position: DoorPosition.Up,
		mode: DoorMode.Automatic,
		timeToNextUpdate: 10000,
		timestamp: new Date(),
	},
	old: {
		position: DoorPosition.Down,
		mode: DoorMode.Manual,
		timeToNextUpdate: 10000,
		timestamp: new Date(),
	},
};

export const socketList: SocketList = {
	door: ["socket-id-1", "socket-id-2"],
	client: ["socket-id-1", "socket-id-2", "socket-id-3", "socket-id-4"],
};

export const newSocket = {
	/* eslint-disable @typescript-eslint/no-unused-vars, no-empty-function, @typescript-eslint/no-empty-function*/
	on: (channel: string, listener: (...args: unknown[]) => void): void => {},
	id: "new-socket",
} as Socket;
