import { IStoredContent } from "@root/models/storedContent";
import { DoorMode } from "@shared/constants/doorMode";
import { DoorPosition } from "@shared/constants/doorPosition";
import { DoorData } from "@shared/models/doorData";

export const fillerDoorData: IStoredContent<DoorData> = {
	new: {
		position: DoorPosition.Up,
		mode: DoorMode.Automatic,
		timeToNextUpdate: 10000,
		timestamp: new Date(),
	},
	old: {
		position: DoorPosition.Down,
		mode: DoorMode.Manual,
		timeToNextUpdate: 10000,
		timestamp: new Date(),
	},
};
