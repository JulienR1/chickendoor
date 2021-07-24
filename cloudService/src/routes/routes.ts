import api from "@root/api/api";
import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
	res.sendStatus(200);
});

router.get("/api/nextMove", async (req: Request, res: Response) => {
	const nextMove = await api.nextMove();
	res.status(200).send(nextMove);
});

export default router;
