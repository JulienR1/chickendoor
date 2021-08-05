import { DoorPosition } from "@shared/constants/doorPosition";

export interface NextMove {
	delayToMoveInMs: number;
	targetPosition: DoorPosition;
}
