import { SocketList } from "@root/models/socketList";
import { SocketChannel } from "@shared/constants/socketChannel";
import { Server, Socket } from "socket.io";

import * as client from "./client";
import * as door from "./door";
import { newSocket, socketList } from "./mock";
import { addNewSocketWithType } from "./service";
import * as service from "./service";
import { SocketType } from "./socketType";

jest.mock("./client", () => ({
	onConnect: jest.fn().mockImplementation(() => {}),
}));

jest.mock("./door", () => ({
	onConnect: jest.fn().mockImplementation(() => {}),
}));

let toFunc: jest.FunctionLike;
let emitFunc: jest.FunctionLike;

beforeEach(() => {
	Object.defineProperty(service, "allSocketIds", {
		value: JSON.parse(JSON.stringify(socketList)),
	});

	/* eslint-disable @typescript-eslint/no-unused-vars */
	emitFunc = jest.fn().mockImplementation((channel: string, data: string) => {});
	/* eslint-disable @typescript-eslint/no-unused-vars */
	toFunc = jest.fn().mockImplementation((socketId: string) => ({
		emit: emitFunc,
	}));

	service.setServer({
		to: toFunc,
		/* eslint-disable @typescript-eslint/no-unused-vars */
		on: (channel: string, callback: (socket: Socket) => void) => {},
	} as Server);
});

describe("addNewSocketWithType", () => {
	it("SOC-S-1 - Should throw an error if the provided socket is undefined", () => {
		[undefined, null, ""].forEach((possibleValue) => {
			expect(() => addNewSocketWithType(possibleValue as any as Socket, SocketType.Client)).toThrowError(
				"The provided socket was undefined"
			);
			expect(service.allSocketIds).toEqual(socketList);
		});
	});

	it("SOC-S-2 - Should register the new socket in the sockets list", () => {
		addNewSocketWithType(newSocket, SocketType.Door);

		const { client, door } = socketList;
		expect(service.allSocketIds).toEqual({ client, door: [...door, newSocket.id] });
	});

	it("SOC-S-3 - Should request a door state notification", () => {
		const notifySendSpy = jest.spyOn(service, "notifyRegisteredDoors").mockImplementation(() => {});

		Object.values(SocketType).forEach((socketType) => {
			notifySendSpy.mockReset();
			addNewSocketWithType(newSocket, socketType);

			expect(notifySendSpy).toHaveBeenCalled();
		});
		notifySendSpy.mockRestore();
	});

	it("SOC-S-4 - Should call the proper socket type onConnect method", () => {
		addNewSocketWithType(newSocket, SocketType.Door);
		expect(door.onConnect).toHaveBeenCalled();

		addNewSocketWithType(newSocket, SocketType.Client);
		expect(client.onConnect).toHaveBeenCalled();
	});

	it("SOC-S-5 - Should bind the client socket to door notifications", () => {
		const onSpy = jest.spyOn(newSocket, "on");

		Object.values(SocketType).forEach((socketType) => {
			onSpy.mockClear();
			addNewSocketWithType(newSocket, socketType);

			const expectBase = socketType === SocketType.Client ? expect(onSpy) : expect(onSpy).not;
			expectBase.toHaveBeenCalledWith(SocketChannel.RegisteredDoors, service.notifyRegisteredDoors);
		});

		onSpy.mockRestore();
	});
});

describe("onDisconnect", () => {
	it("SOC-S-6 - Should not modify the socket list if the socket cannot be found", () => {
		Object.values(SocketType).forEach((socketType) => {
			service.onDisconnect("random id that will not be found", socketType);
		});
		expect(service.allSocketIds).toEqual(socketList);
	});

	it("SOC-S-7 - Should remove the socket from the list if it was found", () => {
		Object.values(SocketType).forEach((socketType) => {
			service.onDisconnect(socketList[socketType][0], socketType);
		});

		const expectedSocketList: SocketList = {
			door: [...socketList.door].splice(1),
			client: [...socketList.client].splice(1),
		};
		expect(service.allSocketIds).toEqual(expectedSocketList);
	});

	it("SOC-S-8 - Should trigger a door event if the socket is a door socket", () => {
		const notifySendSpy = jest.spyOn(service, "notifyRegisteredDoors").mockImplementation(() => {});
		service.onDisconnect(socketList.door[0], SocketType.Door);

		expect(notifySendSpy).toHaveBeenCalled();
		notifySendSpy.mockRestore();
	});

	it("SOC-S-9 - Should not trigger a door event if the socket is a client socket", () => {
		const notifySendSpy = jest.spyOn(service, "notifyRegisteredDoors").mockImplementation(() => {});
		service.onDisconnect(socketList.client[0], SocketType.Client);

		expect(notifySendSpy).not.toHaveBeenCalled();
		notifySendSpy.mockRestore();
	});
});

describe("sendToSocketList", () => {
	it("SOC-S-10 - Should emit the provided data to all the provided sockets on the correct channel", () => {
		Object.values(SocketType).forEach((socketType) => {
			[null, "test data"].forEach((testData) => {
				const channel = "random channel" as SocketChannel;
				service.sendToSocketList(socketList[socketType], testData, channel);

				socketList[socketType].forEach((socketId) => {
					expect(toFunc).toHaveBeenCalledWith(socketId);
					expect(emitFunc).toHaveBeenCalledWith(channel, testData);
				});
			});
		});
	});

	it("SOC-S-11 - Should not emit anything if no sockets are provided", () => {
		service.sendToSocketList([], "data", "channel" as SocketChannel);
		expect(toFunc).not.toHaveBeenCalled();
		expect(emitFunc).not.toHaveBeenCalled();
	});
});

describe("notifyRegisteredDoors", () => {
	let sendToSocketSpy: jest.SpyInstance;

	beforeEach(() => {
		sendToSocketSpy?.mockReset();
		sendToSocketSpy = jest.spyOn(service, "sendToSocketList");
	});

	it("SOC-S-12 - Should correctly determine if a door is registered", () => {
		const testNotify = (doorAreRegistered: boolean) => {
			service.notifyRegisteredDoors();

			expect(sendToSocketSpy).toHaveBeenCalledWith(
				doorAreRegistered ? socketList.client : [],
				JSON.stringify({ doorAreRegistered }),
				SocketChannel.RegisteredDoors
			);
		};

		testNotify(true);
		Object.defineProperty(service, "allSocketIds", {
			value: { client: [], door: [] },
		});
		testNotify(false);
	});

	it("SOC-S-13 - Should notify all clients", () => {
		service.notifyRegisteredDoors();
		expect(sendToSocketSpy).toHaveBeenCalled();
	});

	afterEach(() => {
		sendToSocketSpy.mockRestore();
	});
});

afterEach(() => {
	jest.resetAllMocks();
});
