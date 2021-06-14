import express from 'express'

import { GroupController } from "../controllers"
import { Validate } from "../middlewares"

const router = express.Router()

/* POST create a new group */
router.post("/new", Validate.newGroup, GroupController.create)

export { router }