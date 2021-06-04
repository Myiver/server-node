import express from 'express'

import { TeacherController } from "../controllers"

const router = express.Router()

/* POST create a new teacher*/
router.post("/new", TeacherController.create)

export { router }