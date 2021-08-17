import { DaytimeAPIResult, DaytimeData } from "@root/models/daytimeData";
import { NextMove } from "@root/models/nextmove";
import { LightData } from "@shared/models/lightData";
import fetch, { Response } from "node-fetch";

import { calculateDaylight, calculateNextMove } from "./service";

export class Api {
	private readonly DAYTIME_ENDPOINT = "https://api.sunrise-sunset.org/json?lat=46.37268&lng=-72.7358733&formatted=0";

	public nextMove = async (): Promise<NextMove | undefined> => {
		const daytimeData = await this.getDaytimeData();
		return daytimeData ? calculateNextMove(daytimeData) : undefined;
	};

	public daylight = async (): Promise<LightData | undefined> => {
		const daytimeData = await this.getDaytimeData();
		return daytimeData ? calculateDaylight(daytimeData) : undefined;
	};

	private getDaytimeData = async (): Promise<DaytimeData | undefined> => {
		const responseJson: DaytimeAPIResult | undefined = await this.fetchDaytimeAPIResults();
		return responseJson?.status === "OK" ? new DaytimeData(responseJson.results) : undefined;
	};

	private async fetchDaytimeAPIResults(): Promise<DaytimeAPIResult | undefined> {
		const response: Response = await this.fetchDaytimeApi();
		return response.ok ? response.json() : undefined;
	}

	private fetchDaytimeApi(): Promise<Response> {
		return fetch(this.DAYTIME_ENDPOINT);
	}
}
