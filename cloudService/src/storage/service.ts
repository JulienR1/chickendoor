import { existsSync, mkdirSync } from "fs";
import path from "path";

import { Files } from "./files";

const getFullPath = (filepath = ""): string => path.join(process.cwd(), "../data", filepath);

const createStorageDirIfNecessary = (): void => {
	if (!existsSync(getFullPath())) {
		mkdirSync(getFullPath(), { recursive: true });
	}
};

const validateFilePath = (filepath: Files): void => {
	if (!Object.values(Files).includes(filepath)) {
		throw new Error("Invalid path to store data. Make sure that the specified file is registered.");
	}
};

export { createStorageDirIfNecessary, getFullPath, validateFilePath };
