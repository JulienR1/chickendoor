import "./DashboardPage.scss";

import ControlPanel from "@root/components/ControlPanel";
import StateInfo from "@root/components/StateInfo/StateInfo";
import { useSocket } from "@root/contexts/SocketContext";
import classNames from "classnames";
import React from "react";

function DashboardPage(): JSX.Element {
	const socket = useSocket();

	const dashboardClasses = classNames("dashboard", { "dashboard--waiting": !socket });
	return (
		<div className={dashboardClasses}>
			{socket && (
				<>
					<h1 className="dashboard__title">Les poules poules</h1>
					<StateInfo />
					<ControlPanel />
				</>
			)}
			{!socket && <p>En attente de connexion avec la porte..</p>}
		</div>
	);
}

export default DashboardPage;
