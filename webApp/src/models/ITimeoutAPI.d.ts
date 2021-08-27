export interface ITimeoutAPI<T> {
	timeout: NodeJS.Timeout;
	apiData: T;
}
