import { ITimeStamp } from "@root/models/ITimeStamp";
import classNames from "classnames";
import React from "react";

interface IProps {
	data: ITimeStamp;
	classname?: string;
}

function Timestamp({ data, classname }: IProps): JSX.Element {
	return <div className={classNames("timestamp", classname)}>{data.time.toLocaleDateString("en-US")}</div>;
}

export default Timestamp;
