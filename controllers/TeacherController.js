import { TeacherModel } from "../models"

class TeacherController {
  /* Create a new teacher */
  static async create(req, res) {
    const { firstName, lastName, patronymic, subjects, institutionId } = req.body
    const newTeacher = new TeacherModel({
      firstName,
      lastName,
      patronymic,
      institution: institutionId,
      subjects
    })

    const savedTeacher = await newTeacher.save()

    savedTeacher.__v = undefined

    return res.json({ teacher: savedTeacher })
  }

  /* Get teachers list for an institution */
  static async getList(req, res) {
    const { _id } = req.body

    const teachers = await TeacherModel.find({ institution: _id }).select({
      firstName: 1,
      lastName: 1,
      patronymic: 1
    }).lean()

    return res.json({ teachers })
  }

  /* Get one teacher object by id */
  static async getOne(req, res) {
    try {
      const { id } = req.params

      const teacher = await TeacherModel
        .findById(id)
        .populate("subjects")
        .select({ institution: 0, __v: 0 })
        .lean()

      res.json({ teacher })
    } catch ({ message }) {
      res.json({ error: message })
    }
  }
}

export { TeacherController }
