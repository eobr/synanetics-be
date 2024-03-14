import fs from "fs";
import NotFoundError from "../error handling/NotFoundError";
import { Product } from "../Types";

export default class ShopModel {
	private filePath: string;

	constructor() {
		this.filePath = "./data/products.json";
	}

	async getAllProducts(): Promise<{ products: Product[] }> {
		try {
			const jsonData = await fs.promises.readFile(this.filePath, "utf-8");
			const products = JSON.parse(jsonData);
			return products;
		} catch (error) {
			console.error(`Error reading products data from file: ${error}`);
			// todo:: create custom error class
			throw error;
		}
	}

	async addProduct(newProduct: Product): Promise<void> {
		try {
			const { products } = await this.getAllProducts();
			products.push(newProduct);
			await this.updateProducts({ products: products });
		} catch (error) {
			console.error(`Error adding product to file: ${error}`);
			throw error;
		}
	}

	async deleteProduct(productName: string): Promise<void> {
		try {
			let { products } = await this.getAllProducts();

			const productFound = products.findIndex(
				({ name }) => name === productName
			);
			if (productFound === -1) throw new NotFoundError({ productName });

			products = products.filter((product) => product.name !== productName);
			await this.updateProducts({ products: products });
		} catch (error) {
			console.error(`Error deleting product from file: ${error}`);
			throw error;
		}
	}

	async updateProducts(data: any): Promise<void> {
		try {
			await fs.promises.writeFile(this.filePath, JSON.stringify(data));
		} catch (error) {
			console.error(`Error adding product to file: ${error}`);
			throw error;
		}
	}
}
