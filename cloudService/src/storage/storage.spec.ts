import { IStoredContent } from "@root/models/storedContent";
import fs from "fs";

import { Files } from "./files";
import * as storageService from "./service";
import { readFile, writeToFile } from "./storage";

jest.mock("fs", () => ({
	mkdirSync: jest.fn(),
	existsSync: jest.fn(),
	writeFileSync: jest.fn(),
	readFileSync: jest.fn(),
}));

jest.mock("./service", () => ({
	...jest.requireActual("./service"),
	createStorageDirIfNecessary: jest.fn(),
	validateFilePath: jest.fn(),
}));

describe("writeToFile", () => {
	let writeSpy: jest.SpyInstance;

	beforeEach(() => {
		writeSpy?.mockReset();
		writeSpy = jest.spyOn(fs, "writeFileSync");
	});

	it("STO-1 - Should add data to a file in the \"new\" section and move the old data in the \"old\" section", () => {
		const newData = { test: { data: [1, 2, 3, 4] } };
		const oldData = {
			someting: "24",
			another: {
				val: [1, 2, 3],
			},
		};
		const previouslyStoredData: IStoredContent<unknown> = { new: oldData, old: {} };
		const expectedData: IStoredContent<unknown> = { new: newData, old: oldData };

		(fs.readFileSync as any).mockReturnValue(JSON.stringify(previouslyStoredData));

		writeToFile(Files.DoorData, JSON.stringify(newData));
		expect(writeSpy).toHaveBeenCalledWith(storageService.getFullPath(Files.DoorData), JSON.stringify(expectedData));
	});

	it("STO-2 - Should set the \"old\" section to \"{}\" if there was no prior data", () => {
		const newData = { test: { data: [1, 2, 3, 4] } };
		const previouslyStoredData: IStoredContent<unknown> = { new: {}, old: {} };
		const expectedData: IStoredContent<unknown> = { new: newData, old: {} };

		(fs.readFileSync as any).mockReturnValue(JSON.stringify(previouslyStoredData));

		writeToFile(Files.DoorData, JSON.stringify(newData));
		expect(writeSpy).toHaveBeenCalledWith(storageService.getFullPath(Files.DoorData), JSON.stringify(expectedData));
	});

	it("STO-3 - Should validate the file path before writing", () => {
		const validateSpy = jest.spyOn(storageService, "validateFilePath");

		writeToFile(Files.DoorData, "{}");
		expect(validateSpy).toHaveBeenCalled();
	});

	it("STO-4 - Should throw an error if there was an error when parsing the data", () => {
		["", null, undefined, "invalid"].forEach((content) => {
			(fs.readFileSync as any).mockReturnValue("{}");
			expect(() => writeToFile(Files.DoorData, content as string)).toThrowError();

			(fs.readFileSync as any).mockReturnValue(content);
			expect(() => writeToFile(Files.DoorData, "{}")).toThrowError();
		});
	});
});

describe("readFile", () => {
	beforeEach(() => {
		(storageService.validateFilePath as any).mockReset();
	});

	it("STO-5 - Should validate the file path before reading", () => {
		const validateSpy = jest.spyOn(storageService, "validateFilePath");

		readFile(Files.DoorData);
		expect(validateSpy).toHaveBeenCalled();
	});

	it("STO-6 - Should return an empty string if there is no data or no file", () => {
		(storageService.validateFilePath as any).mockImplementation(() => {});
		expect(readFile("invalid-path-to-no-file.json" as Files)).toBe("");
	});

	it("STO-7 - Should return the correct data upon read", () => {
		const expectedData = { value: 1, valueTwo: 2 };

		(fs.readFileSync as any).mockReturnValue(JSON.stringify(expectedData));
		expect(readFile(Files.DoorData)).toBe(JSON.stringify(expectedData));
	});
});
