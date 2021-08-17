import { IStoredContent } from "@root/models/storedContent";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";

const getFullPath = (filepath: string) => path.join(process.cwd(), "../data", filepath);

const createDirIfNecessary = (filepath: string) => {
	if (!existsSync(getFullPath(filepath))) {
		mkdirSync(path.join(process.cwd(), "../data"), { recursive: true });
	}
};

const writeToFile = <T>(filepath: string, content: string): void => {
	createDirIfNecessary(filepath);
	const originalContentStr = readFile(filepath);
	const originalContent: T = JSON.parse(originalContentStr || "{}").new;

	const parsedContent: T = JSON.parse(content);
	const newContent: IStoredContent<T | Record<string, unknown>> = { new: parsedContent, old: originalContent || {} };
	writeFileSync(getFullPath(filepath), JSON.stringify(newContent));
};

const readFile = (filepath: string): string => {
	createDirIfNecessary(filepath);
	try {
		return readFileSync(getFullPath(filepath), "utf8");
	} catch (exception) {
		return "";
	}
};

export { readFile, writeToFile };
