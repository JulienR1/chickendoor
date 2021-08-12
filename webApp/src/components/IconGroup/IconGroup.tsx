import "./IconGroup.scss";

import { DualIcon, IIcon } from "@root/models/IIcon";
import classNames from "classnames";
import React from "react";

interface IProps {
	icons: (IIcon | DualIcon)[];
}

function IconGroup({ icons }: IProps) {
	const renderMaterialIcon = (iconName: string, key = "") => {
		return (
			<span className="material-icons" key={key}>
				{iconName}
			</span>
		);
	};

	return (
		<div className="iconGroup">
			{icons.map((iconData, index) => (
				<div className={classNames("icon", { "icon--dual": Array.isArray(iconData) })} key={index}>
					{Array.isArray(iconData)
						? iconData.map((icon, iconIndex) => renderMaterialIcon(icon.name, iconIndex.toString()))
						: renderMaterialIcon(iconData.name)}
				</div>
			))}
		</div>
	);
}

export default IconGroup;
