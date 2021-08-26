import { SocketChannel } from "@shared/constants/socketChannel";

import { socketList } from "./mock";
import * as service from "./service";
import { sendToClientSockets, sendToDoorSockets } from "./sockets";

let sendSpy: jest.SpyInstance;

beforeEach(() => {
	Object.defineProperty(service, "allSocketIds", { value: socketList });

	sendSpy?.mockReset();
	sendSpy = jest.spyOn(service, "sendToSocketList").mockImplementation(() => {});
});

describe("sendToDoorSockets", () => {
	it("SOC-1 - Should call sendToSocketList() with only the registered door sockets", () => {
		validateSend(sendToDoorSockets, socketList.door);
	});
});

describe("sendToClientSockets", () => {
	it("SOC-2 - Should call sendToSocketList() with only the registered client sockets", () => {
		validateSend(sendToClientSockets, socketList.client);
	});
});

const validateSend = (funcToTest: typeof sendToClientSockets | typeof sendToDoorSockets, targetSocketIds: string[]) => {
	["data", null].forEach((dataToSend) => {
		const channel: SocketChannel = "random channel" as SocketChannel;
		funcToTest(dataToSend, channel);

		expect(sendSpy).toHaveBeenCalledWith(targetSocketIds, dataToSend, channel);
	});
};
