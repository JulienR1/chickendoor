import express, { Application, Request, Response } from "express";
import http from "http";
import { Server, ServerOptions } from "socket.io";
import dotenv from "dotenv";

const socketSettings: Partial<ServerOptions> = {
	cors: {
		credentials: true,
	},
};

if (process.env.NODE_ENV !== "production") {
	const result = dotenv.config();
	if (result.error) {
		throw result.error;
	}
}

const port = process.env.PORT || 8080;
const app: Application = express();
const server: http.Server = http.createServer(app);
const io: Server = new Server(server, socketSettings);

io.on("connection", (socket) => {
	io.emit("main", "Hello from Heroku");
});

app.get("/", (req: Request, res: Response) => {
	res.send("Hello world from heroku!").status(200);
});

server.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
