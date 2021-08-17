import { sunsetTimeOffset } from "@root/globals";

export interface DaytimeAPIResult {
	results: {
		sunrise: string;
		sunset: string;
	};
	status: string;
}

export class DaytimeData {
	public sunrise: number;
	public sunset: number;

	constructor({ sunrise, sunset }: { sunset: string; sunrise: string }) {
		if (!sunrise || !sunset || sunrise === "" || sunset === "") {
			throw new Error("[DaytimeData]: The specified values are invalid");
		}
		this.sunrise = new Date(sunrise).getTime();
		this.sunset = new Date(sunset).getTime() + sunsetTimeOffset;
	}
}
