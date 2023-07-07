import { Router } from "express";
import { transactionSchema } from "../schemas/bank.schemas.js";
import { listUserTransactions, transaction } from "../controllers/bank.controller.js";
import { validateToken } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validateSchema.js";

const bankRouter = Router();
bankRouter.use(validateToken);

bankRouter.post("/nova-transacao/:tipo", validateSchema(transactionSchema), transaction);
bankRouter.get("/home", listUserTransactions);

export default bankRouter;
