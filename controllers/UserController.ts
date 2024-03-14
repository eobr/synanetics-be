import { NextFunction, Request, Response } from "express";
import UserModel from "../models/UserModel";
import { Basket, Product } from "../Types";
import NotFoundError from "../error handling/NotFoundError";
import JSONSchemaValidator from "../JSONSchemaValidator";
import ValidationError from "../error handling/ValidationError";

export default class UserController {
	private users: Map<string, UserModel>;
	private validator: JSONSchemaValidator;

	constructor() {
		this.users = new Map();
		this.validator = new JSONSchemaValidator();
	}

	addUser(req: Request, res: Response): void {
		const id = req.params.id;
		if (!this.users.has(id)) {
			const newUser = new UserModel(id);
			this.users.set(id, newUser);
			res.status(201).json({ message: `User ${id} added successfully` });
		} else {
			res.status(400).json({ error: `User ${id} already exists` });
		}
	}

	async addToBasket(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const id = req.params.id;
			const item = req.body;
			const productSchemaPath = "./schemas/ItemSchema.json";
			const valid: boolean = await this.validator.validateSchema(
				item,
				productSchemaPath
			);
			if (!valid) {
				throw new ValidationError();
			}

			// todo: Check if item is in the shop, throw NotFoundError

			const user = this.users.get(id);
			if (!user) {
				throw new NotFoundError({ id });
			}
			user.addToBasket(item);
			res
				.status(200)
				.json({ message: `Item ${item.name} added to user ${id}'s basket` });
		} catch (error) {
			next(error);
		}
	}

	batchAddToBasket(req: Request, res: Response, next: NextFunction): void {
		try {
			const id = req.params.id;
			const items: Product[] = req.body.items;
			const user = this.users.get(id);
			if (!user) {
				throw new NotFoundError({ id });
			}
			user.batchAddToBasket(items);
			res.status(200).json({ message: `Items added to user ${id}'s basket` });
		} catch (error) {
			next(error);
		}
	}

	removeFromBasket(req: Request, res: Response, next: NextFunction): void {
		try {
			const id = req.params.id;
			const item: any = req.body;
			const user = this.users.get(id);
			if (!user) {
				throw new NotFoundError({ id });
			}

			user.removeFromBasket(item);
			res.status(200).json({
				message: `Item ${item.name} removed from user ${id}'s basket`,
			});
		} catch (error) {
			next(error);
		}
	}

	getBasket(req: Request, res: Response, next: NextFunction): void {
		try {
			const id = req.params.id;
			const user = this.users.get(id);
			if (!user) {
				throw new NotFoundError({ id });
			}
			const basket: Basket = user.getBasket();
			res.status(200).json(basket);
		} catch (error) {
			next(error);
		}
	}

	getTotal(req: Request, res: Response, next: NextFunction): void {
		try {
			const id = req.params.id;
			const user = this.users.get(id);
			if (!user) {
				throw new NotFoundError({ id });
			}
			const total: number = user.getTotal();
			res.status(200).json({ total });
		} catch (error) {
			next(error);
		}
	}

	displayTotal(req: Request, res: Response, next: NextFunction): void {
		try {
			const id = req.params.id;
			const user = this.users.get(id);
			if (!user) {
				throw new NotFoundError({ id });
			}
			const total: string = user.displayTotal();
			res.status(200).json({ total });
		} catch (error) {
			next(error);
		}
	}

	applyDiscounts(req: Request, res: Response, next: NextFunction): void {
		try {
			const id = req.params.id;
			const discountCode: string = req.body.discountCode;
			const user = this.users.get(id);
			if (!user) {
				throw new NotFoundError({ id });
			}
			const discountedTotal: string = user.applyDiscounts(discountCode);
			res.status(200).json({ discountedTotal });
		} catch (error) {
			next(error);
		}
	}
}
