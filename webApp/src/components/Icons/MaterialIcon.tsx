import { IconName } from "@root/models/IIcon";
import classNames from "classnames";
import React from "react";

interface IProps {
	iconName: IconName;
	classname?: string;
}

function MaterialIcon({ iconName, classname }: IProps): JSX.Element {
	const classnames = classNames("material-icons", classname);

	return <span className={classnames}>{iconName}</span>;
}

MaterialIcon.defaultProps = {
	classname: "",
};

export default MaterialIcon;
