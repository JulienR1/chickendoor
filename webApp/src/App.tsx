import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { SocketChannel } from "@shared/constants/socketChannel";

function App() {
	useEffect(() => {
		console.log("use effect");

		const socket = io("http://localhost:8080");
		socket.emit("clientConnect");
		socket.on(SocketChannel.NotifyDoorState, (data) => {
			console.log("Received notification: ", JSON.parse(data));
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	return (
		<>
			<main>app!</main>
		</>
	);
}

export default App;
