import { IconName } from "@root/models/IIcon";
import React from "react";

interface IProps {
	iconName: IconName;
}

function MaterialIcon({ iconName }: IProps): JSX.Element {
	return <span className="material-icons">{iconName}</span>;
}

export default MaterialIcon;
