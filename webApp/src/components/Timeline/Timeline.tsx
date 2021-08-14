import "./Timeline.scss";

import { IconName } from "@root/models/IIcon";
import { ITimeStamp } from "@root/models/ITimeStamp";
import classNames from "classnames";
import React from "react";

import MaterialIcon from "../Icons/MaterialIcon";
import Timestamp from "./Timestamp";

interface IProps {
	timestamps: ITimeStamp[];
	classname?: string;
}

function Timeline({ timestamps, classname }: IProps): JSX.Element {
	const manualContent = "m";

	const renderExtra = ({ completed, manual }: ITimeStamp) => {
		return (
			<div className="timeline__timestamp__extra">
				{completed && <MaterialIcon iconName={IconName.Checkmark} classname="timeline__timestamp__extra__completed" />}
				{manual && (
					<span
						className={classNames("timeline__timestamp__extra__manual", {
							"timeline__timestamp__extra__manual--minified": completed,
						})}
					>
						{manualContent}
					</span>
				)}
			</div>
		);
	};

	return (
		<div className={classNames("timeline", classname)}>
			<div className="timeline__icon">
				<MaterialIcon iconName={IconName.Watch} />
			</div>
			<div className="timeline__timestamps">
				<div className="timeline__timestamps__scroller">
					{timestamps.map((timestamp, index) => (
						<Timestamp
							data={timestamp}
							extra={renderExtra(timestamp)}
							classname={"timeline__timestamps__scroller__child"}
							key={index.toString()}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default Timeline;
