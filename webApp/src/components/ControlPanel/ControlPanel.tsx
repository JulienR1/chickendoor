import "./ControlPanel.scss";

import { Timeline } from "@root/components/Timeline";
import { IconName } from "@root/models/IIcon";
import { ITimeStamp } from "@root/models/ITimeStamp";
import React from "react";

function ControlPanel(): JSX.Element {
	const timestamps: ITimeStamp[] = [
		{ time: new Date(), icon: { name: IconName.Refresh }, completed: true, manual: false },
		{ time: new Date(), icon: { name: IconName.DoorOpen }, completed: true, manual: false },
		{ time: new Date(), icon: { name: IconName.DoorClosed }, completed: true, manual: true },
		{ time: new Date(), icon: { name: IconName.DoorOpen }, completed: false, manual: true },
		{ time: new Date(), icon: { name: IconName.DoorClosed }, completed: false, manual: false },
	];

	return (
		<div className="controlPanel">
			<Timeline timestamps={timestamps} classname="controlPanel__timeline" />
			<div className="controlPanel__controls">controls</div>
			<div className="controlPanel__logs">logs</div>
		</div>
	);
}

export default ControlPanel;
