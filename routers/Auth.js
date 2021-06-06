import express from "express"

import { AuthController } from "../controllers"
import { Auth, Validate } from "../middlewares"

const router = express.Router()

/* POST register(create) a new institution */
router.post("/register", Validate.register, Auth.checkLoginUnique, AuthController.register)

/* POST login */
router.post("/login", Validate.login, AuthController.login)

/* POST auth */
router.get("/verifyToken", Auth.verifyToken, AuthController.getVerifiedInstitution)

export { router }
