import "./DashboardPage.scss";

import ControlPanel from "@root/components/ControlPanel";
import StateInfo from "@root/components/StateInfo/StateInfo";
import React from "react";

function DashboardPage(): JSX.Element {
	return (
		<div className="dashboard">
			<h1 className="dashboard__title">Les poules poules</h1>

			<StateInfo />
			<ControlPanel />
		</div>
	);
}

export default DashboardPage;
