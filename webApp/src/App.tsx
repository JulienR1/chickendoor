import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import socketIOClient from "socket.io-client";

function App() {
	useEffect(() => {
		const socket = socketIOClient("http://127.0.0.1:8080", {
			// transports: ["websocket"],
		});
		socket.on("main", (data) => {
			console.log(data);
		});

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
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
