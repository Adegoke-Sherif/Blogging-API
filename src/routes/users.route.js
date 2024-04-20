import { Router } from "express"
import * as userController from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { adminMiddleware } from "../middleware/admin.middleware.js";

const userRoute = Router();

userRoute.get("/", authMiddleware, adminMiddleware, userController.getAllUsers);





export default userRoute;