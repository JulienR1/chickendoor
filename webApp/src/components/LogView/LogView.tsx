import "./LogView.scss";

import { ILog } from "@root/models/ILog";
import classNames from "classnames";
import React from "react";

interface IProps {
	logs: ILog[];
	classnames?: string;
}

function LogView({ logs, classnames }: IProps): JSX.Element {
	return (
		<div className={classNames("logView", classnames)}>
			{logs.length > 0 && (
				<div className="logView__scroller">
					{logs.map(({ time, log }, index) => (
						<div className="logView__log" key={index.toString()}>
							<div className="log__time">{time.toLocaleTimeString("en-US", { hour12: false, timeStyle: "short" })}</div>
							<div className="log__msg">{log}</div>
						</div>
					))}
				</div>
			)}
			{logs.length === 0 && <div className="logView__empty">{"Rien à afficher pour l'instant"}</div>}
		</div>
	);
}

LogView.defaultProps = {
	classnames: "",
};

export default LogView;
