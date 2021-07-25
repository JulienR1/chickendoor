import { DoorMode } from "../constants/doorMode";
import { DoorPosition } from "../constants/doorPosition";

export interface DoorData {
	timestamp?: Date;
	position: DoorPosition;
	mode: DoorMode;
	timeToNextUpdate: number;
}

export function sanitize(dataToSanitize: DoorData): DoorData {
	const findOrDefault = <T extends DoorMode | DoorPosition>(elementToFind: T, defaultValue: T, allValues: T[]) =>
		allValues.find((element) => element === elementToFind) || defaultValue;

	return {
		position: findOrDefault(dataToSanitize.position, DoorPosition.Unknown, Object.values(DoorPosition)),
		mode: findOrDefault(dataToSanitize.mode, DoorMode.Unknown, Object.values(DoorMode)),
		timeToNextUpdate: parseInt(dataToSanitize.timeToNextUpdate?.toString()) || 0,
		timestamp: new Date(),
	};
}

export function isValid(dataToValidate: DoorData): boolean {
	return dataToValidate.timeToNextUpdate >= 0;
}
