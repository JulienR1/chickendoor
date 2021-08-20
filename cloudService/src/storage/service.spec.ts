import fs from "fs";

import { Files } from "./files";
import { createStorageDirIfNecessary, validateFilePath } from "./service";

jest.mock("fs", () => ({
	existsSync: jest.fn(),
	mkdirSync: jest.fn(),
}));

describe("createStorageDirIfNecessary", () => {
	let mkdirSpy: jest.SpyInstance;

	beforeEach(() => {
		mkdirSpy?.mockReset();
		mkdirSpy = jest.spyOn(fs, "mkdirSync");
	});

	it("STO-S-1 - Should create the storage directory if it is missing", () => {
		(fs.existsSync as any).mockReturnValue(false);

		createStorageDirIfNecessary();
		expect(mkdirSpy).toHaveBeenCalled();
	});

	it("STO-S-2 - Should skip directory creation if it is already created", () => {
		(fs.existsSync as any).mockReturnValue(true);

		createStorageDirIfNecessary();
		expect(mkdirSpy).not.toHaveBeenCalled();
	});
});

describe("validateFilePath", () => {
	it("STO-S-3 - Should accept file from the white list", () => {
		Object.values(Files).forEach((file) => {
			expect(() => validateFilePath(file)).not.toThrowError();
		});
	});

	it("STO-S-4 - Should throw an error when a random filepath is passed", () => {
		["error", "invalid", "", undefined].forEach((invalidFile) => {
			expect(() => validateFilePath(invalidFile as Files)).toThrowError(
				"Invalid path to store data. Make sure that the specified file is registered."
			);
		});
	});
});
