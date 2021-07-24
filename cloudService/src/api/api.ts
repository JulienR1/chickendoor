import { DaytimeAPIResult, DaytimeData } from "@root/models/daytimeData";
import { NextMove } from "@root/models/nextmove";
import { DoorPosition } from "@shared/constants/doorPosition";
import fetch, { Response } from "node-fetch";

export class Api {
	private readonly DAYTIME_ENDPOINT = "https://api.sunrise-sunset.org/json?lat=46.37268&lng=-72.7358733&formatted=0";

	private now() {
		return Date.now();
	}

	public nextMove = async (): Promise<NextMove | undefined> => {
		const responseJson: DaytimeAPIResult | undefined = await this.fetchDaytimeAPIResults();
		if (responseJson?.status === "OK") {
			const daytimeData = new DaytimeData(responseJson.results);
			return this.calculateNextMove(daytimeData);
		}
		return undefined;
	};

	private async fetchDaytimeAPIResults(): Promise<DaytimeAPIResult | undefined> {
		const response: Response = await this.fetchApi();
		if (response.ok) {
			return response.json();
		}
		return undefined;
	}

	private fetchApi(): Promise<Response> {
		return fetch(this.DAYTIME_ENDPOINT);
	}

	private calculateNextMove({ sunrise, sunset }: DaytimeData): NextMove {
		const now = this.now();
		if (now < sunrise) {
			return {
				targetPosition: DoorPosition.UP,
				delayToMoveInMs: sunrise - now,
			};
		} else if (now < sunset) {
			return {
				targetPosition: DoorPosition.DOWN,
				delayToMoveInMs: sunset - now,
			};
		} else {
			const midnight = new Date(now);
			midnight.setHours(24, 0, 0);
			return {
				targetPosition: DoorPosition.UP,
				delayToMoveInMs: midnight.getTime() - now,
			};
		}
	}
}
