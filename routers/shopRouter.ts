import express, { NextFunction, Request, Response } from 'express';
import ShopController from '../controllers/ShopController';

const router = express.Router();
const shopController = new ShopController();

router.get('/products', (req: Request, res: Response, next: NextFunction) => {
  shopController.getProducts(req, res, next);
});

router.post('/products', (req: Request, res: Response, next: NextFunction) => {
  shopController.addProduct(req, res, next);
});

router.delete('/products', (req: Request, res: Response, next: NextFunction) => {
  shopController.deleteProduct(req, res, next);
});

export default router;
