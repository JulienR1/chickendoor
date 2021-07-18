import express, { Application, Request, Response } from "express";
import http from "http";
import { Server, ServerOptions } from "socket.io";

const socketSettings: Partial<ServerOptions> = {
	cors: {
		credentials: true,
	},
};

const port = process.env.PORT || 8080;
const app: Application = express();
const server: http.Server = http.createServer(app);
const io: Server = new Server(server, socketSettings);

io.on("connection", (socket) => {
	io.emit("main", "A new player has joined the party.");
});

app.get("/", (req: Request, res: Response) => {
	res.send("Hello world from heroku!").status(200);
});

server.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
