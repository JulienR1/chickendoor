import "./IconGroup.scss";

import { DualIcon, IIcon } from "@root/models/IIcon";
import classNames from "classnames";
import React from "react";

import MaterialIcon from "./MaterialIcon";

interface IProps {
	icons: (IIcon | DualIcon)[];
}

function IconGroup({ icons }: IProps): JSX.Element {
	return (
		<div className="iconGroup">
			{icons.map((iconData, index) => (
				<div className={classNames("icon", { "icon--dual": Array.isArray(iconData) })} key={index}>
					{Array.isArray(iconData) ? (
						iconData.map((icon, iconIndex) => <MaterialIcon iconName={icon.name} key={iconIndex.toString()} />)
					) : (
						<MaterialIcon iconName={iconData.name} />
					)}
				</div>
			))}
		</div>
	);
}

export default IconGroup;
