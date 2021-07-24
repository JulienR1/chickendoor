import { DaytimeAPIResult } from "@root/models/daytimeData";
import { DoorPosition } from "@shared/constants/doorPosition";
import { Response } from "node-fetch";

import { Api } from "./api";

let api: Api;
beforeEach(() => {
	api = new Api();
});

it("Should initialize", () => {
	expect(api).toBeTruthy();
});

describe("nextMove", () => {
	let mockFetch: jest.SpyInstance;

	beforeEach(() => {
		mockFetch = jest.spyOn(api as any, "fetchDaytimeAPIResults").mockImplementation(() => {});
	});

	it("API-1 - Should call API", async () => {
		mockFetch.mockReturnValue(undefined);
		await api.nextMove();

		expect(mockFetch).toHaveBeenCalled();
	});

	it("API-2 - Should return undefined when the API fails", () => {
		const returnValues: (Partial<DaytimeAPIResult> | undefined)[] = [
			undefined,
			{ results: undefined, status: "failed" },
			{ results: undefined, status: undefined },
		];

		returnValues.forEach(async (returnValue) => {
			mockFetch.mockReturnValueOnce(returnValue);
			expect(await api.nextMove()).toBe(undefined);
		});
	});

	it("API-3 - Should calculate the next move upon API reponse	", async () => {
		const mockCalculate = jest.spyOn(api as any, "calculateNextMove").mockImplementation(() => {});
		const fetchReturnValue: DaytimeAPIResult = {
			status: "OK",
			results: { sunrise: "7:00:00", sunset: "20:00:00" },
		};
		mockFetch.mockReturnValue(fetchReturnValue);

		await api.nextMove();
		expect(mockCalculate).toHaveBeenCalled();
	});
});

describe("fetchDaytimeAPIResults", () => {
	let mockFetch: jest.SpyInstance;
	let mockFetchRemoteAPI: jest.SpyInstance;

	beforeEach(() => {
		mockFetch = jest.spyOn(api as any, "fetchDaytimeAPIResults");
		mockFetchRemoteAPI = jest.spyOn(api as any, "fetchApi").mockImplementation(() => {});
	});

	it("API-4 - Should return undefined when the fetch request fails", async () => {
		const fetchBadResponse: Partial<Response> = { ok: false };
		mockFetchRemoteAPI.mockReturnValueOnce(fetchBadResponse);

		await api.nextMove();

		expect(await mockFetch.mock.results[0].value).toBe(undefined);
	});

	it("API-5 - Should return json data upon api request", async () => {
		const fetchOkResponse: Partial<Response> = { ok: true, json: async () => "jsonData" };
		mockFetchRemoteAPI.mockReturnValueOnce(fetchOkResponse);

		await api.nextMove();
		expect(await mockFetch.mock.results[0].value).toBe("jsonData");
	});

	it("API-6 - Should response contain the correct interface", async () => {
		mockFetchRemoteAPI.mockRestore();
		await api.nextMove();

		const apiResponse: DaytimeAPIResult = await mockFetch.mock.results[0].value;

		expect(apiResponse.results).not.toBe(undefined);
		expect(typeof apiResponse.results).toBe("object");
		expect(apiResponse.status).not.toBe(undefined);
		expect(typeof apiResponse.status).toBe("string");

		expect(apiResponse.results.sunrise).not.toBe(undefined);
		expect(typeof apiResponse.results.sunrise).toBe("string");
		expect(apiResponse.results.sunset).not.toBe(undefined);
		expect(typeof apiResponse.results.sunset).toBe("string");
	});
});

describe("calculateNextMove", () => {
	let today: Date;

	let mockNow: jest.SpyInstance;

	beforeEach(() => {
		today = new Date(2000, 0, 1);
		const sunrise = new Date(2000, 0, 1, 7, 0, 0);
		const sunset = new Date(2000, 0, 1, 19, 0, 0);

		const fetchResponse: DaytimeAPIResult = {
			status: "OK",
			results: {
				sunrise: sunrise.toISOString(),
				sunset: sunset.toISOString(),
			},
		};

		jest
			.spyOn(api as any, "fetchDaytimeAPIResults")
			.mockImplementation(() => {})
			.mockReturnValue(fetchResponse);

		mockNow = jest.spyOn(api as any, "now").mockImplementation(() => {});
	});

	it("API-7 - Should request UP before sunrise", async () => {
		const now: Date = new Date(today);
		now.setHours(5, 0, 0);
		mockNow.mockReturnValue(now);

		expect((await api.nextMove())?.targetPosition).toBe(DoorPosition.UP);
	});

	it("API-8 - Should request UP after sunset", async () => {
		const now: Date = new Date(today);
		now.setHours(20, 0, 0);
		mockNow.mockReturnValue(now);

		expect((await api.nextMove())?.targetPosition).toBe(DoorPosition.UP);
	});

	it("API-9 - Should request DOWN after sunrise and before sunset", async () => {
		const now: Date = new Date(today);
		now.setHours(12, 0, 0);
		mockNow.mockReturnValue(now);

		expect((await api.nextMove())?.targetPosition).toBe(DoorPosition.DOWN);
	});

	it("API-10 - Should correctly request update delays", async () => {
		const now: Date = new Date(today);
		now.setHours(6, 50, 0);
		mockNow.mockReturnValueOnce(new Date(now));

		now.setHours(18, 50, 0);
		mockNow.mockReturnValueOnce(new Date(now));

		now.setHours(19, 10, 0);
		mockNow.mockReturnValueOnce(new Date(now));

		expect((await api.nextMove())?.delayToMoveInMs).toBe(10 * 60 * 1000);
		expect((await api.nextMove())?.delayToMoveInMs).toBe(10 * 60 * 1000);
		expect((await api.nextMove())?.delayToMoveInMs).toBe((4 * 60 + 50) * 60 * 1000);
	});
});
