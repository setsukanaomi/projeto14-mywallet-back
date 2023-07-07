import { Router } from "express";
import userRouter from "./users.routes.js";
import bankRouter from "./bank.routes.js";

const router = Router();

router.use(userRouter);
router.use(bankRouter);

export default router;
