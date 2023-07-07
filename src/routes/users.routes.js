import { Router } from "express";
import { signin, signup } from "../controllers/users.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { registerSchema, loginSchema } from "../schemas/users.schemas.js";

const userRouter = Router();

userRouter.post("/", validateSchema(loginSchema), signin);
userRouter.post("/cadastro", validateSchema(registerSchema), signup);

export default userRouter;
