import "./IconGroup.scss";

import { DualIcon, IIcon } from "@root/models/IIcon";
import classNames from "classnames";
import React from "react";

import MaterialIcon from "./MaterialIcon";

interface IProps {
	icons: (IIcon | DualIcon)[];
}

function IconGroup({ icons }: IProps): JSX.Element {
	const renderIcon = (iconData: IIcon | DualIcon, index: number) => {
		const iconDataArray = Array.isArray(iconData) ? iconData : [iconData];

		return (
			<div
				className={classNames(
					"icon",
					{ "icon--dual": Array.isArray(iconData) },
					{ "icon--disabled": iconDataArray.every((icon) => icon.disabled) }
				)}
				key={index}
			>
				{iconDataArray.map((icon, iconIndex) => (
					<MaterialIcon
						iconName={icon.name}
						classname={classNames({ "material-icons--disabled": icon.disabled })}
						key={iconIndex.toString()}
					/>
				))}
			</div>
		);
	};

	return <div className="iconGroup">{icons.map(renderIcon)}</div>;
}

export default IconGroup;
