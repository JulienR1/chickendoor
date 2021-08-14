import { IIcon } from "./IIcon";

export interface ITimeStamp {
	time: Date;
	icon: IIcon;
	completed: boolean;
	manual: boolean;
}
