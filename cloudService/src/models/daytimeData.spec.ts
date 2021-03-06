import { DaytimeData } from "./daytimeData";

describe("DaytimeData", () => {
	it("DD-1 - Should correctly convert from ISO string to date", () => {
		const sunrise: Date = new Date(2000, 0, 1, 7, 0, 0);
		const sunset: Date = new Date(2000, 0, 1, 19, 0, 0);
		const daytimeData = new DaytimeData({ sunrise: sunrise.toISOString(), sunset: sunset.toISOString() });

		expect(daytimeData.sunrise).toBe(sunrise.getTime());
		expect(daytimeData.sunset).toBe(sunset.getTime());
	});

	it("DD-2 - Should throw an error when the dates are invalid", () => {
		const invalidDates: any[] = [null, undefined, ""];

		invalidDates.forEach((sunrise) => {
			invalidDates.forEach((sunset) => {
				expect(() => {
					new DaytimeData({ sunrise, sunset });
				}).toThrowError("[DaytimeData]: The specified values are invalid");
			});
		});
	});
});
