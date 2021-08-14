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
	return (
		<div className={classNames("timeline", classname)}>
			<div className="timeline__icon">
				<MaterialIcon iconName={IconName.Watch} />
			</div>
			<div className="timeline__timestamps">
				<div className="timeline__timestamps__scroller">
					{timestamps.map((timestamp, index) => (
						<Timestamp data={timestamp} classname={"timeline__timestamps__scroller__child"} key={index.toString()} />
					))}
				</div>
			</div>
		</div>
	);
}

export default Timeline;
