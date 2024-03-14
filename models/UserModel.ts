import NotFoundError from "../error handling/NotFoundError";
import ValidationError from "../error handling/ValidationError";
import { Basket, Product } from "../Types";

export default class UserModel {
	private id: string;
	private basket: Basket;

	constructor(id: string) {
		this.id = id;
		this.basket = [];
	}

	addToBasket(item: Product): void {
		this.basket.push(item);
	}

	batchAddToBasket(items: Product[]): void {
		this.basket.push(...items);
	}

	removeFromBasket(item: any): void {
        // todo: better error handling and validation here
        if (!("name" in item)) throw new ValidationError()
		const index = this.basket.findIndex(x => x.name === item.name);
		if (index !== -1) {
			this.basket.splice(index, 1);
		} else {
            throw new NotFoundError({item})
        }
	}

	batchRemoveFromBasket(items: Product[]): void {
		items.forEach((item) => {
			this.removeFromBasket(item);
		});
	}

	getBasket(): Basket {
		return this.basket;
	}

	getID(): string {
		return this.id;
	}

	getTotal(): number {
		let total = 0;
		for (const item of this.basket) {
			total = total + item.price;
		}
		return total;
	}

	displayTotal(): string {
		return (Math.round(this.getTotal() * 100) / 100).toFixed(2);
	}

	applyDiscounts(discountCode: string): string {
		const originalTotal = this.getTotal();

		let percentageDiscount: number = 0;

		if (discountCode === "twenty") percentageDiscount = 20;
		else if (discountCode === "fifty") percentageDiscount = 50;

		const newTotal = (originalTotal * (100 - percentageDiscount)) / 100;
        return (Math.round(newTotal * 100) / 100).toFixed(2);
	}
}
