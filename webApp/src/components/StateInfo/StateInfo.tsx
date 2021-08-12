import "./StateInfo.scss";

import { DualIcon, IconName, IIcon } from "@root/models/IIcon";
import React from "react";

import IconGroup from "../IconGroup";

function StateInfo() {
	const doorStateIcons: (IIcon | DualIcon)[] = [
		{ name: IconName.DoorClosed },
		[{ name: IconName.ArrowUp }, { name: IconName.ArrowDown }],
		{ name: IconName.DoorOpen },
	];
	const daylightIcons: IIcon[] = [{ name: IconName.Sun }, { name: IconName.Moon }];

	return (
		<div className="stateInfo">
			<IconGroup icons={doorStateIcons} />
			<IconGroup icons={daylightIcons} />
		</div>
	);
}

export default StateInfo;
