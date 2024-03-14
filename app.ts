import express, { Express, Request, Response } from 'express'
import userRouter from "./routers/userRouter"
import shopRouter from "./routers/shopRouter"

const app: Express = express()

app.use(express.json());
app.use("/api", userRouter);
app.use("/api", shopRouter);

export default app;
