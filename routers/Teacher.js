import express from 'express'

import { TeacherController } from "../controllers"
import { Validate } from "../middlewares"

const router = express.Router()

/* POST create a new teacher*/
router.post("/new", Validate.newTeacher, TeacherController.create)

/* POST get teachers list by institution _id */
router.post("/get-list", TeacherController.getList)

/* GET get one teacher object by id */
router.get("/get-one/:id", TeacherController.getOne)

export { router }