import { Router } from "express";
import { loginHandler, signupHandler } from "../handlers/auth";

const authRouter = Router();

authRouter.post("/login", loginHandler);
authRouter.post("/signup", signupHandler);

export default authRouter;