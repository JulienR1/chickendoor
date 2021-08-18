import { SocketChannel } from "@shared/constants/socketChannel";
import React, { createContext, ReactNode, ReactNodeArray, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { IRegisteredDoors } from "@shared/models/registeredDoors";

interface IProps {
	children: ReactNode | ReactNodeArray;
}

type PendingSocket = Socket | undefined;

const context = createContext<PendingSocket>(undefined);
const useSocket = (): PendingSocket => useContext(context);

function SocketContext({ children }: IProps): JSX.Element {
	const [socket, setSocket] = useState<PendingSocket>();

	useEffect(() => {
		if (process.env.SERVER_ENDPOINT) {
			const socket = io(process.env.SERVER_ENDPOINT);

			socket.on(SocketChannel.RegisteredDoors, (registeredDoorsDataStr: string) => {
				const { doorAreRegistered }: IRegisteredDoors = JSON.parse(registeredDoorsDataStr);
				setSocket(doorAreRegistered ? socket : undefined);
			});

			socket.emit(SocketChannel.ClientConnect);

			return () => {
				socket?.disconnect();
				setSocket(undefined);
			};
		} else {
			console.error("No server endpoint has been provided for the socket connection");
		}
	}, []);

	return <context.Provider value={socket}>{children}</context.Provider>;
}

export { SocketContext, useSocket };
