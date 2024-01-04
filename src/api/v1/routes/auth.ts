import { authController } from "../controllers";
import { Router } from "express";
import { authValidation } from "../validators";
import { getRequestLimiter } from "../../../utils/rate-limiter";

const authRouter=Router()

authRouter.use(getRequestLimiter(2*60*1000,30))

authRouter.post('/signup',authValidation.validateInput.bind(authValidation),authController.signUp.bind(authController))

authRouter.post('/login',authValidation.validateInput.bind(authValidation),authController.login.bind(authController))

export default authRouter