import * as constants from "@root/globals";
import { DaytimeData } from "@root/models/daytimeData";
import { DoorPosition } from "@shared/constants/doorPosition";
import MockDate from "mockdate";

import * as service from "./service";

let today: Date;
let daytimeData: DaytimeData;

const customSunsetTimeOffset = 15000;

beforeAll(() => {
	today = new Date(2000, 0, 1);
	const sunrise = new Date(2000, 0, 1, 7, 0, 0);
	const sunset = new Date(2000, 0, 1, 19, 0, 0);
	daytimeData = new DaytimeData({ sunrise: sunrise.toISOString(), sunset: sunset.toISOString() });

	Object.defineProperty(constants, "sunsetTimeOffset", { value: customSunsetTimeOffset });
});

// TODO: Take into account manual moves
describe("calculateNextMove", () => {
	it("API-S-1 - Should request UP before the sunrise", async () => {
		validateCalculate([5, 0, 0], service.calculateNextMove, "targetPosition", DoorPosition.Up);
	});

	it("API-S-2 - Should request UP after the sunset", async () => {
		validateCalculate([20, 0, 0], service.calculateNextMove, "targetPosition", DoorPosition.Up);
	});

	it("API-S-3 - Should request DOWN after the sunrise and before the sunset", async () => {
		validateCalculate([12, 0, 0], service.calculateNextMove, "targetPosition", DoorPosition.Down);
	});

	it("API-S-4 - Should correctly request update delays", async () => {
		validateCalculate([6, 50, 0], service.calculateNextMove, "delayToMoveInMs", 10 * 60 * 1000);
		validateCalculate(
			[18, 50, 0],
			service.calculateNextMove,
			"delayToMoveInMs",
			10 * 60 * 1000 + customSunsetTimeOffset
		);
		validateCalculate([19, 10, 0], service.calculateNextMove, "delayToMoveInMs", (4 * 60 + 50) * 60 * 1000);
	});
});

describe("calculateDaylight", () => {
	it("API-S-5 - Should not flag as DAY before the sunrise", () => {
		validateCalculate([6, 0, 0], service.calculateDaylight, "isDay", false);
	});

	it("API-S-6 - Should flag as DAY after the sunrise and before the sunset", () => {
		validateCalculate([12, 0, 0], service.calculateDaylight, "isDay", true);
	});

	it("API-S-7 - Should not flag as DAY after the sunset", () => {
		validateCalculate([20, 0, 0], service.calculateDaylight, "isDay", false);
	});

	it("API-S-8 - Should calculate corect delays for next update", () => {
		validateCalculate([6, 50, 0], service.calculateDaylight, "delayToUpdate", 10 * 60 * 1000);
		validateCalculate(
			[7, 10, 0],
			service.calculateDaylight,
			"delayToUpdate",
			(12 * 60 - 10) * 60 * 1000 + customSunsetTimeOffset
		);
		validateCalculate([18, 50, 0], service.calculateDaylight, "delayToUpdate", 10 * 60 * 1000 + customSunsetTimeOffset);
		validateCalculate([19, 10, 0], service.calculateDaylight, "delayToUpdate", (12 * 60 - 10) * 60 * 1000);
	});
});

const validateCalculate = (
	[hour, min, sec]: [number, number, number],
	calculateFn: (daytimeData: DaytimeData) => { [key: string]: any },
	propertyToCheck: string,
	expected: any
) => {
	const now: Date = new Date(today);
	now.setHours(hour, min, sec);
	MockDate.set(now);

	expect(calculateFn(daytimeData)[propertyToCheck]).toBe(expected);
};
