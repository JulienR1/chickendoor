import { DaytimeAPIResult, DaytimeData } from "@root/models/daytimeData";
import { Response } from "node-fetch";

import { Api } from "./api";
import * as service from "./service";

let api: Api;
beforeEach(() => {
	api = new Api();
});

it("Should initialize", () => {
	expect(api).toBeTruthy();
});

describe("nextMove", () => {
	it("API-1 - Should return undefined when no daytime data is found", async () => {
		const mockCalculate = jest.spyOn(service, "calculateNextMove");
		jest.spyOn(api as any, "getDaytimeData").mockImplementation(() => undefined);

		expect(await api.nextMove()).toBeUndefined();
		expect(mockCalculate).not.toHaveBeenCalled();
	});

	it("API-2 - Should calculate the next move when daytime data is found", async () => {
		const mockCalculate = jest.spyOn(service, "calculateNextMove");

		const daytimeData: DaytimeData = {
			sunrise: new Date(2000, 0, 1, 7, 0, 0).getTime(),
			sunset: new Date(2000, 0, 1, 19, 0, 0).getTime(),
		};
		jest.spyOn(api as any, "getDaytimeData").mockImplementation(() => daytimeData);

		await api.nextMove();
		expect(mockCalculate).toHaveBeenCalled();
	});
});

describe("daylight", () => {
	it("API-3 - Should return undefined when no daytime data is found", async () => {
		const mockCalculate = jest.spyOn(service, "calculateDaylight");
		jest.spyOn(api as any, "getDaytimeData").mockImplementation(() => undefined);

		expect(await api.daylight()).toBeUndefined();
		expect(mockCalculate).not.toHaveBeenCalled();
	});

	it("API-4 - Should calculate the next move when daytime data is found", async () => {
		const mockCalculate = jest.spyOn(service, "calculateDaylight");

		const daytimeData: DaytimeData = {
			sunrise: new Date(2000, 0, 1, 7, 0, 0).getTime(),
			sunset: new Date(2000, 0, 1, 19, 0, 0).getTime(),
		};
		jest.spyOn(api as any, "getDaytimeData").mockImplementation(() => daytimeData);

		await api.daylight();
		expect(mockCalculate).toHaveBeenCalled();
	});
});

describe("getDaytimeData", () => {
	let mockFetch: jest.SpyInstance;

	beforeEach(() => {
		mockFetch = jest.spyOn(api as any, "fetchDaytimeAPIResults").mockImplementation(() => {});
	});

	it("API-5 - Should call API", async () => {
		mockFetch.mockReturnValue(undefined);
		await api.nextMove();

		expect(mockFetch).toHaveBeenCalled();
	});

	it("API-6 - Should return undefined when the API fails", () => {
		const returnValues: (Partial<DaytimeAPIResult> | undefined)[] = [
			undefined,
			{ results: undefined, status: "failed" },
			{ results: undefined, status: undefined },
		];

		returnValues.forEach(async (returnValue) => {
			mockFetch.mockReturnValueOnce(returnValue);
			expect(await api.nextMove()).toBeUndefined();
		});
	});
});

describe("fetchDaytimeAPIResults", () => {
	let mockFetch: jest.SpyInstance;
	let mockFetchRemoteAPI: jest.SpyInstance;

	beforeEach(() => {
		mockFetch = jest.spyOn(api as any, "fetchDaytimeAPIResults");
		mockFetchRemoteAPI = jest.spyOn(api as any, "fetchDaytimeApi").mockImplementation(() => {});
	});

	it("API-7 - Should return undefined when the fetch request fails", async () => {
		const fetchBadResponse: Partial<Response> = { ok: false };
		mockFetchRemoteAPI.mockReturnValueOnce(fetchBadResponse);

		await api.nextMove();

		expect(await mockFetch.mock.results[0].value).toBe(undefined);
	});

	it("API-8 - Should return json data upon api request", async () => {
		const fetchOkResponse: Partial<Response> = { ok: true, json: async () => "jsonData" };
		mockFetchRemoteAPI.mockReturnValueOnce(fetchOkResponse);

		await api.nextMove();
		expect(await mockFetch.mock.results[0].value).toBe("jsonData");
	});

	it("API-9 - Should response contain the correct interface", async () => {
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
