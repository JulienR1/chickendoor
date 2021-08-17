import { DaytimeData } from "@root/models/daytimeData";
import { NextMove } from "@root/models/nextmove";
import { DoorPosition } from "@shared/constants/doorPosition";
import { LightData } from "@shared/models/lightData";

const calculateNextMove = ({ sunrise, sunset }: DaytimeData): NextMove => {
	if (now() < sunrise) {
		return {
			targetPosition: DoorPosition.Up,
			delayToMoveInMs: sunrise - now(),
		};
	} else if (now() < sunset) {
		return {
			targetPosition: DoorPosition.Down,
			delayToMoveInMs: sunset - now(),
		};
	} else {
		const midnight = new Date(now());
		midnight.setHours(24, 0, 0);
		return {
			targetPosition: DoorPosition.Up,
			delayToMoveInMs: midnight.getTime() - now(),
		};
	}
};

const calculateDaylight = ({ sunrise, sunset }: DaytimeData): LightData => {
	const dayInMs = 24 * 60 * 60 * 1000;

	const isDay = now() > sunrise && now() < sunset;
	const delayToUpdate = isDay ? sunset - now() : (sunrise - now() + dayInMs) % dayInMs;

	return { isDay, delayToUpdate };
};

const now = () => Date.now();

export { calculateDaylight,calculateNextMove };
