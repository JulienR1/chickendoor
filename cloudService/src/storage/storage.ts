import { IStoredContent } from "@root/models/storedContent";
import { readFileSync, writeFileSync } from "fs";

import { Files } from "./files";
import { createStorageDirIfNecessary, getFullPath, validateFilePath } from "./service";

const writeToFile = <T>(filepath: Files, content: string): void => {
	createStorageDirIfNecessary();
	validateFilePath(filepath);

	const originalContentStr = readFileSync(getFullPath(filepath), "utf8");
	const originalContent: T = JSON.parse(originalContentStr || "{}").new;

	if (content && originalContent) {
		const parsedContent: T = JSON.parse(content);
		const newContent: IStoredContent<T | Record<string, unknown>> = { new: parsedContent, old: originalContent || {} };
		writeFileSync(getFullPath(filepath), JSON.stringify(newContent));
	} else {
		throw new Error("The previously saved data or the new data was invalid.");
	}
};

const readFileAsJSON = <T>(filepath: Files): IStoredContent<T> | undefined => {
	createStorageDirIfNecessary();
	validateFilePath(filepath);

	try {
		return JSON.parse(readFileSync(getFullPath(filepath), "utf8"));
	} catch (exception) {
		return undefined;
	}
};

export { readFileAsJSON, writeToFile };
