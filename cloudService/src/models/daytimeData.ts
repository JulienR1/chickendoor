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
		this.sunrise = new Date(sunrise).getTime();
		this.sunset = new Date(sunset).getTime();
	}
}
