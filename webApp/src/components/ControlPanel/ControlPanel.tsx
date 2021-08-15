import "./ControlPanel.scss";

import LogView from "@root/components/LogView";
import { Timeline } from "@root/components/Timeline";
import { IconName } from "@root/models/IIcon";
import { ILog } from "@root/models/ILog";
import { ITimeStamp } from "@root/models/ITimeStamp";
import React from "react";

import { Controls } from "../Controls";

function ControlPanel(): JSX.Element {
	const timestamps: ITimeStamp[] = [
		{ time: new Date(), icon: { name: IconName.Refresh }, completed: true, manual: false },
		{ time: new Date(), icon: { name: IconName.DoorOpen }, completed: true, manual: false },
		{ time: new Date(), icon: { name: IconName.DoorClosed }, completed: true, manual: true },
		{ time: new Date(), icon: { name: IconName.DoorOpen }, completed: false, manual: true },
		{ time: new Date(), icon: { name: IconName.DoorClosed }, completed: false, manual: false },
	];

	const logs: ILog[] = [
		// { time: new Date(), log: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium, natus." },
		// { time: new Date(), log: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium, natus." },
		// { time: new Date(), log: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium, natus." },
		// { time: new Date(), log: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium, natus." },
		// { time: new Date(), log: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium, natus." },
		// { time: new Date(), log: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium, natus." },
	];

	return (
		<div className="controlPanel">
			<Timeline timestamps={timestamps} className="controlPanel__timeline" />
			<Controls className="controlPanel__controls" />
			<LogView classnames="controlPanel__logs" logs={logs} />
		</div>
	);
}

export default ControlPanel;
