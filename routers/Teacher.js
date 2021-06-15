import express from 'express'

import { TeacherController } from "../controllers"
import { Validate } from "../middlewares"

const router = express.Router()

/* POST create a new teacher*/
router.post("/new", Validate.newTeacher, TeacherController.create)

/* POST get teachers list by institution _id */
router.post("/get-list", TeacherController.getList)

/* POST get teachers list for creating a new group by institution _id */
router.post("/get-list-for-new-group", TeacherController.getListForNewGroup)

/* GET get one teacher object by id */
router.get("/get-one/:id", TeacherController.getOne)

/* PUT edit an existing teacher */
router.put("/edit", TeacherController.edit)

/* DELETE and existing teacher */
router.delete("/delete/:id", TeacherController.delete)

export { router }