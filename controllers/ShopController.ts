import { Request, Response, NextFunction } from 'express';
import ShopModel from "../models/ShopModel";
import JSONSchemaValidator from "../JSONSchemaValidator";
import ValidationError from "../error handling/ValidationError";

export default class ShopController {
    private shop: ShopModel;
    private validator: JSONSchemaValidator;

    constructor() {
        this.shop = new ShopModel();
        this.validator = new JSONSchemaValidator();
    }

    async getProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const products = await this.shop.getAllProducts();
            res.json(products);
        } catch (error) {
            next(error);
        }
    }

    async addProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const product = req.body;
            await this.validateProduct(product);
            await this.shop.addProduct(product);
            res.status(201).json({ message: 'Product added successfully' });
        } catch (error) {
            next(error);
        }
    }

    async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const productName = req.body.productName;
            await this.shop.deleteProduct(productName);
            res.json({ message: 'Product deleted successfully' });
        } catch (error) {
            next(error);
        }
    }

    private async validateProduct(product: any): Promise<void> {
        const productSchemaPath = "./schemas/ItemSchema.json";
        const valid: boolean = await this.validator.validateSchema(product, productSchemaPath);
        if (!valid) {
            throw new ValidationError();
        }
    }
}