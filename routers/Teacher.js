import express from 'express'

import { TeacherController } from "../controllers"

const router = express.Router()

/* POST create a new teacher*/
router.post("/new", TeacherController.create)

/* POST get teachers list by institution _id */
router.post("/get-list", TeacherController.getList)

export { router }