import * as constants from "@root/globals";
import { IStoredContent } from "@root/models/storedContent";
import { SocketChannel } from "@shared/constants/socketChannel";
import { DoorData } from "@shared/models/doorData";
import MockDate from "mockdate";

import { fillerDoorData } from "../mock";
import * as sockets from "../sockets";
import { requestNewDoorData, updateClientDoorData } from "./service";

describe("updateClientDoorData", () => {
	let sendSpy: jest.SpyInstance;

	beforeEach(() => {
		sendSpy?.mockReset();
		sendSpy = jest.spyOn(sockets, "sendToClientSockets").mockImplementation(() => {});
	});

	it("SOCC-S-1 - Should not send data if the received data is not defined", () => {
		updateClientDoorData(undefined);
		expect(sendSpy).not.toHaveBeenCalled();
	});

	it("SOCC-S-2 - Should not send data if the received data is not the correct format", () => {
		[undefined, null, {}, { new: null, old: {} }, { new: undefined }].forEach((wrongData) => {
			updateClientDoorData(wrongData as any as IStoredContent<DoorData>);
			expect(sendSpy).not.toHaveBeenCalled();
		});
	});

	it("SOCC-S-3 - Should notify all client sockets of a change", () => {
		updateClientDoorData(fillerDoorData);
		expect(sendSpy).toHaveBeenCalledWith(JSON.stringify(fillerDoorData.new), SocketChannel.NotifyDoorState);
	});
});

describe("requestNewDoorData", () => {
	let sendSpy: jest.SpyInstance;

	beforeEach(() => {
		MockDate.set(new Date(2000, 0, 1, 12, 0, 10));
		Object.defineProperty(constants, "minimumTimeBetweenDoorRefreshes", { value: 10000 });

		sendSpy?.mockReset();
		sendSpy = jest.spyOn(sockets, "sendToDoorSockets").mockImplementation(() => {});
	});

	it("SOCC-S-4 - Should request a data update if the previous data is invalid", () => {
		requestNewDoorData(undefined);
		expect(sendSpy).toHaveBeenCalled();
	});

	it("SOCC-S-5 - Should not request an update if the last update was made before or on the set delay", () => {
		for (let seconds = 0; seconds < 10; seconds++) {
			const doorData: IStoredContent<DoorData> = {
				new: {
					...fillerDoorData.new,
					timestamp: new Date(2000, 0, 1, 12, 0, seconds),
				},
				old: fillerDoorData.old,
			};

			requestNewDoorData(doorData);
			expect(sendSpy).not.toHaveBeenCalled();
		}
	});

	it("SOCC-S-6 - Should request an update if the last update was made after the set delay", () => {
		const doorData: IStoredContent<DoorData> = {
			new: {
				...fillerDoorData.new,
				timestamp: new Date(2000, 0, 1, 11, 59, 59),
			},
			old: fillerDoorData.old,
		};

		requestNewDoorData(doorData);
		expect(sendSpy).toHaveBeenCalledWith(null, SocketChannel.RequestDoorState);
	});
});
