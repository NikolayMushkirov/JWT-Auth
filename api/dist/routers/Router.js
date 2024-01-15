import { Router } from "express";
import { AuthValidator } from "../validators/AuthValidator.js";
import { AuthController } from "../controllers/AuthController.js";
var router = Router();
router.post("/sign-in", AuthValidator.signIn, AuthController.signIn);
router.post("/sign-up", AuthValidator.signUp, AuthController.signUp);
router.post("/logout", AuthValidator.logOut, AuthController.logOut);
router.post("/refresh", AuthValidator.refresh, AuthController.refresh);
export default router;
