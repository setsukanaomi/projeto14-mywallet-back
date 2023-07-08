import { Router } from "express";
import { transactionSchema } from "../schemas/bank.schemas.js";
import { listUserTransactions, transaction } from "../controllers/bank.controller.js";
import { validateToken } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validateSchema.js";

const bankRouter = Router();

bankRouter.post("/nova-transacao/:tipo", validateToken, validateSchema(transactionSchema), transaction);
bankRouter.get("/home", validateToken, listUserTransactions);

export default bankRouter;
