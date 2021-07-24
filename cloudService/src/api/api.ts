import { DaytimeAPIResult, DaytimeData } from "@root/models/daytimeData";
import { NextMove } from "@root/models/nextmove";
import { DoorPosition } from "@shared/constants/doorPosition";
import fetch, { Response } from "node-fetch";

class Api {
	private readonly DAYTIME_ENDPOINT = "https://api.sunrise-sunset.org/json?lat=46.37268&lng=-72.7358733&formatted=0";

	public nextMove = async (): Promise<NextMove | undefined> => {
		const responseJson: DaytimeAPIResult | undefined = await this.fetchDaytimeAPIResults();
		if (responseJson?.status === "OK") {
			const daytimeData = new DaytimeData(responseJson.results);
			return this.calculateNextMove(daytimeData);
		}
		return undefined;
	};

	private async fetchDaytimeAPIResults(): Promise<DaytimeAPIResult | undefined> {
		const response: Response = await fetch(this.DAYTIME_ENDPOINT);
		if (response.ok) {
			return response.json();
		}
		return undefined;
	}

	private calculateNextMove({ sunrise, sunset }: DaytimeData): NextMove {
		const now = Date.now();
		if (now < sunrise || now > sunset) {
			return {
				targetPosition: DoorPosition.UP,
				delayToMoveInMs: sunrise - now,
			};
		} else {
			return {
				targetPosition: DoorPosition.DOWN,
				delayToMoveInMs: sunset - now,
			};
		}
	}
}

export default new Api();
