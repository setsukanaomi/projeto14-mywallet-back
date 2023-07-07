import { Router } from "express";
import { signup } from "../controllers/users.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { userSchema } from "../schemas/users.schemas.js";

const userRouter = Router();

userRouter.post("/cadastro", validateSchema(userSchema), signup);

export default userRouter;
