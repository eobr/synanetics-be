import request from "supertest";
import app from "../app";
import ShopModel from "../models/ShopModel";

describe("Shop Routes", () => {
	let initialProducts: { products: any[] };

	beforeAll(async () => {
		const shopModel = new ShopModel();
		const products = await shopModel.getAllProducts();
		initialProducts = products;
	});

	it("GET /products should return all products", async () => {
		const response = await request(app).get("/api/products");
		expect(response.status).toBe(200);
		expect(Array.isArray(response.body.products)).toBe(true);
	});

	it("POST /products should add a new product", async () => {
		const newProduct = {
			name: "Test Product",
			price: 9.99,
		};

		const response = await request(app).post("/api/products").send(newProduct);
		expect(response.status).toBe(201);
		expect(response.body).toBeDefined();
		expect(response.body.message).toBe("Product added successfully");

		// verify :)
		const verifyResponse = await request(app).get("/api/products");
		const addedProduct = verifyResponse.body.products.find(
			(product: any) => product.name === newProduct.name
		);
		expect(addedProduct).toBeDefined();
		expect(addedProduct.price).toBe(newProduct.price);
	});

	it("DELETE /products/:productName should delete the specified product", async () => {
		const newProduct = {
			name: "Test Product",
			price: 9.99,
		};

		await request(app).post("/api/products").send(newProduct);

		const response = await request(app)
			.delete(`/api/products`)
			.send({ productName: newProduct.name });
		expect(response.status).toBe(200);
		expect(response.body).toBeDefined();
		expect(response.body.message).toBe("Product deleted successfully");

		// verify :)
		const verifyResponse = await request(app).get("/api/products");
		expect(verifyResponse.status).toBe(200);
		expect(verifyResponse.body).toBeDefined();
		const deletedProduct = verifyResponse.body.products.find(
			(product: any) => product.name === newProduct.name
		);
		expect(deletedProduct).toBeUndefined();
	});

	afterAll(async () => {
		const shopModel = new ShopModel();
		await shopModel.updateProducts(initialProducts);
	});
});
