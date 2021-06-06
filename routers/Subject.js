import express from "express"

import { SubjectController } from "../controllers"

const router = express.Router()

/* GET by id */
router.get("/get-one/:id", SubjectController.getOne)

/* GET All  */
router.get("/get-all", SubjectController.getAll)

/* POST create a new subject */
router.post("/new", SubjectController.create)

export { router }