import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import socketIOClient from "socket.io-client";

function App() {
	if (!process.env.REACT_APP_SERVER) {
		throw new Error("[APP] The remote server has not been specified.");
	}

	useEffect(() => {
		const socket = socketIOClient(process.env.REACT_APP_SERVER as string);
		socket.emit("clientConnect");

		return () => {
			socket.disconnect();
		};
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
					Link here
				</a>
			</header>
		</div>
	);
}

export default App;
