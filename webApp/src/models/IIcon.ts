export type DualIcon = [IIcon, IIcon];

export interface IIcon {
	name: IconName;
	disabled?: boolean;
}

export enum IconName {
	Empty = "",
	DoorOpen = "meeting_room",
	DoorClosed = "door_front",
	ArrowDown = "arrow_drop_down",
	ArrowUp = "arrow_drop_up",
	Sun = "brightness_high",
	Moon = "dark_mode",
	Watch = "watch",
	Refresh = "sync",
	Checkmark = "check",
	Add = "add",
	Power = "power_settings_new",
	Settings = "settings",
}
