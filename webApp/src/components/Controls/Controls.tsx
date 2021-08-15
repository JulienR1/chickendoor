import "./Controls.scss";

import { IconName } from "@root/models/IIcon";
import classNames from "classnames";
import React from "react";

import ControlHolder from "./ControlHolder";

interface IProps {
	className?: string;
}

interface IButtonData {
	label: string;
	onClick: () => void;
	disabled?: boolean;
}

function Controls({ className }: IProps): JSX.Element {
	const renderButton = ({ label, onClick, disabled = false }: IButtonData) => {
		const classes = classNames("controls__command", { "controls__command--disabled": disabled });

		return (
			<button className={classes} disabled={disabled} onClick={onClick}>
				{label}
			</button>
		);
	};

	return (
		<div className={classNames("controls", className)}>
			<ControlHolder icon={{ name: IconName.Add }}>
				{renderButton({ label: "Ouvrir", onClick: () => console.log("open") })}
				{renderButton({ label: "Fermer", onClick: () => console.log("close") })}
			</ControlHolder>

			<ControlHolder icon={{ name: IconName.Power }}>
				{renderButton({ label: "Redémarrer", onClick: () => console.log("reboot") })}
			</ControlHolder>

			<ControlHolder icon={{ name: IconName.Settings }}>
				{renderButton({ label: "Consulter", onClick: () => console.log("read") })}
				{renderButton({ label: "Modifier", onClick: () => console.log("modify") })}
			</ControlHolder>
		</div>
	);
}

export default Controls;
