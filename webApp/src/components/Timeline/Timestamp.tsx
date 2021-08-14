import "./Timestamp.scss";

import { ITimeStamp } from "@root/models/ITimeStamp";
import classNames from "classnames";
import React from "react";

import MaterialIcon from "../Icons/MaterialIcon";

interface IProps {
	data: ITimeStamp;
	extra?: JSX.Element;
	classname?: string;
}

function Timestamp({ data, extra, classname }: IProps): JSX.Element {
	return (
		<div className={classNames("timestamp", classname)}>
			<div className="timestamp__icon">
				<MaterialIcon iconName={data.icon.name} />
			</div>
			<div className="timestamp__time">
				{data.time.toLocaleTimeString("en-US", { hour12: false, timeStyle: "short" })}
			</div>
			<div className="timestamp__extra">{extra && <div className="timestamp__extra__content">{extra}</div>}</div>
		</div>
	);
}

Timestamp.defaultProps = {
	extra: undefined,
	classname: "",
};

export default Timestamp;
