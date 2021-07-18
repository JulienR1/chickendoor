import express, { Application, Request, Response } from "express";

const port = process.env.PORT || 8080;
const app: Application = express();

app.get("/", (req: Request, res: Response) => {
	res.send("Hello world from heroku!");
});

app.listen(port);
