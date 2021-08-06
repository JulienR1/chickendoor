import { SocketChannel } from "@shared/constants/socketChannel";
import React, { useEffect } from "react";
import { io } from "socket.io-client";

function App(): JSX.Element {
	useEffect(() => {
		const socket = io(process.env.SERVER_ENDPOINT as string);
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
