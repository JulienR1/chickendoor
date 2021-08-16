import React from "react";

import { SocketContext } from "./contexts/SocketContext";
import DashboardPage from "./pages/DashboardPage";

function App(): JSX.Element {
	return (
		<SocketContext>
			<DashboardPage />
		</SocketContext>
	);
}

export default App;
