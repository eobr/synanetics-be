import { Request, Response } from "express";
import NotFoundError from "./error handling/NotFoundError";
import ValidationError from "./error handling/ValidationError";

export default function handleErrors(
	error: Error,
	req: Request,
	res: Response,
	next: any
) {
	console.error(error);
	if (error instanceof ValidationError || error instanceof NotFoundError) {
		res.status(error.status).json(error);
	} else {
		res.status(500).json({ error: "Internal Server Error" });
	}
}
