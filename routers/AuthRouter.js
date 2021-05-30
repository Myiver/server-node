import express, { Router } from "express"

import { AuthController } from "../controllers"
import { checkLoginUnique } from "../middlewares"

const router = Router()

/* POST register(create) a new institution */
router.post("/register", checkLoginUnique, AuthController.register)

/* POST login */
router.post("/login", AuthController.login)

export { router }