import UserController from "../controllers/UserController";
import Router, { Response, Request, NextFunction } from "express";

const router = Router();

const userController = new UserController();

router.get("/", (_, res: Response) => {
  res.json({ message: "ok" });
});

router.post("/user/:id", (req: Request, res: Response) => {
  userController.addUser(req, res);
});

router.post("/user/:id/basket", (req: Request, res: Response, next: NextFunction) => {
  userController.addToBasket(req, res, next);
});

router.delete("/user/:id/basket", (req: Request, res: Response, next: NextFunction) => {
  userController.removeFromBasket(req, res, next);
});

router.get("/user/:id/basket", (req: Request, res: Response, next: NextFunction) => {
  userController.getBasket(req, res, next);
});

router.get("/user/:id/basket/total", (req: Request, res: Response, next: NextFunction) => {
  userController.getTotal(req, res, next);
});

router.get("/user/:id/basket/displayTotal", (req: Request, res: Response, next: NextFunction) => {
  userController.displayTotal(req, res, next);
});

router.post("/user/:id/basket/applyDiscounts", (req: Request, res: Response, next: NextFunction) => {
  userController.applyDiscounts(req, res, next);
});

export default router;
