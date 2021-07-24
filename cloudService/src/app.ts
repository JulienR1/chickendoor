import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import http from "http";

import router from "./routes/routes";
import { initSocket } from "./sockets/sockets";

if (process.env.NODE_ENV !== "production") {
	const result = dotenv.config();
	if (result.error) {
		throw result.error;
	}
}

const port = process.env.PORT || 8080;
const app: Application = express();
const httpServer = http.createServer(app);

app.use(cors());
app.use(router);
initSocket(httpServer);

httpServer.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
