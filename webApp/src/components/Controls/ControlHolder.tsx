import "./ControlHolder.scss";

import { IIcon } from "@root/models/IIcon";
import classNames from "classnames";
import React, { ReactNode, ReactNodeArray } from "react";

import MaterialIcon from "../Icons/MaterialIcon";

interface IProps {
	icon: IIcon;
	children: ReactNode | ReactNodeArray;
	className?: string;
}

function ControlHolder({ icon, children, className }: IProps): JSX.Element {
	const renderChild = (child: ReactNode, index: number) => (
		<div className="controlHolder__content__interactable" key={index.toString()}>
			{child}
		</div>
	);

	return (
		<div className={classNames("controlHolder", className)}>
			<div className="controlHolder__icon">
				<MaterialIcon iconName={icon.name} />
			</div>
			<div className="controlHolder__content">{(Array.isArray(children) ? children : [children]).map(renderChild)}</div>
		</div>
	);
}

export default ControlHolder;
