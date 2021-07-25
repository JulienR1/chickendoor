import { Socket } from "socket.io";

export const onConnect = (socket: Socket): void => {
	console.log("client connection", socket, "TODO!");
};
