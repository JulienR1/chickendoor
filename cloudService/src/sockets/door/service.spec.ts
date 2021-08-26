import * as storage from "@root/storage";
import { Files } from "@root/storage/files";
import { SocketChannel } from "@shared/constants/socketChannel";
import * as doorModel from "@shared/models/doorData";
import MockDate from "mockdate";

import { fillerDoorData } from "../mock";
import * as sockets from "../sockets";
import { saveNewDoorData } from "./service";

jest.mock("@shared/models/doorData", () => ({
	...jest.requireActual("@shared/models/doorData"),
	isValid: jest.fn(),
	sanitize: jest.fn((data) => data),
}));

jest.mock("@root/storage", () => ({
	...jest.requireActual("@root/storage"),
	writeToFile: jest.fn(),
}));

describe("saveNewDoorData", () => {
	let now: Date;

	beforeEach(() => {
		now = new Date(200, 0, 1, 12, 0, 0);
		MockDate.set(now);
		global.console = { ...global.console, error: jest.fn() };
	});

	it("SOCD-S-1 - Should sanitize the provided data", () => {
		(doorModel.isValid as any).mockImplementation(() => false);

		saveNewDoorData(fillerDoorData.new);
		expect(doorModel.sanitize).toHaveBeenCalledWith(fillerDoorData.new);
	});

	it("SOCD-S-2 - Should print an error when the data is not valid", () => {
		(doorModel.isValid as any).mockImplementation(() => false);

		saveNewDoorData(fillerDoorData.new);
		expect(console.error).toHaveBeenCalledWith(
			"The received data was not proper. It has been refused and no updates were sent"
		);
	});

	it("SOCD-S-3 - Sould write to file and notify all clients", () => {
		const sendSpy = jest.spyOn(sockets, "sendToClientSockets").mockImplementation(() => {});
		(doorModel.isValid as any).mockImplementation(() => true);

		const doorData: doorModel.DoorData = JSON.parse(JSON.stringify(fillerDoorData.new));
		doorData.timestamp = now;

		saveNewDoorData(doorData);
		expect(storage.writeToFile).toHaveBeenCalledWith(Files.DoorData, JSON.stringify(doorData));
		expect(sendSpy).toHaveBeenCalledWith(JSON.stringify(doorData), SocketChannel.NotifyDoorState);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});
});
