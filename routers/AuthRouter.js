import express from "express"

import { AuthController } from "../controllers"
import { checkLoginUnique, verifyToken } from "../middlewares"

const router = express.Router()

/* POST register(create) a new institution */
router.post("/register", checkLoginUnique, AuthController.register)

/* POST login */
router.post("/login", AuthController.login)

/* POST auth */
router.get("/verifyToken", verifyToken, AuthController.getVerifiedInstitution)

export { router }
