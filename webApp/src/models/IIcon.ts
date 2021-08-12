export type DualIcon = [IIcon, IIcon];

export interface IIcon {
	name: IconName;
}

export enum IconName {
	DoorOpen = "meeting_room",
	DoorClosed = "door_front",
	ArrowDown = "arrow_drop_down",
	ArrowUp = "arrow_drop_up",
	Sun = "brightness_high",
	Moon = "dark_mode",
}
