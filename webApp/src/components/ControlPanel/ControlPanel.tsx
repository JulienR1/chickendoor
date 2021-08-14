import "./ControlPanel.scss";

import { Timeline } from "@root/components/Timeline";
import { ITimeStamp } from "@root/models/ITimeStamp";
import React from "react";

function ControlPanel(): JSX.Element {
	const timestamps: ITimeStamp[] = [
		{ time: new Date() },
		{ time: new Date() },
		{ time: new Date() },
		{ time: new Date() },
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
