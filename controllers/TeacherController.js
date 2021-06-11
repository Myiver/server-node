import { TeacherModel } from "../models"

class TeacherController {
  /* Create a new teacher */
  static async create(req, res) {
    try {
      const { firstName, lastName, patronymic, subjects, institutionId } = req.body

      const newTeacher = new TeacherModel({
        firstName,
        lastName,
        patronymic,
        institution: institutionId,
        subjects
      })

      console.log(institutionId)

      const savedTeacher = await newTeacher.save()

      savedTeacher.__v = undefined

      return res.json({ teacher: savedTeacher })
    } catch ({ message }) {
      return res.json({ error: message })
    }
  }

  /* Get teachers list for an institution */
  static async getList(req, res) {
    try {
      const { _id } = req.body

      const teachers = await TeacherModel.find({ institution: _id }).select({
        firstName: 1,
        lastName: 1,
        patronymic: 1
      }).lean()

      return res.json({ teachers })
    } catch ({ message }) {
      return res.json({ error: message })
    }
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

      return res.json({ teacher })
    } catch ({ message }) {
      return res.json({ error: message })
    }
  }

  /* Edit teacher */
  static async edit(req, res) {
    try {
      const { _id, firstName, lastName, patronymic, subjects } = req.body

      await TeacherModel.findOneAndUpdate({ _id }, { firstName, lastName, patronymic, subjects }, { new: true })

      return res.end()
    } catch ({ message }) {
      return res.json({ error: message })
    }
  }

  /* Delete teacher */
  static async delete(req, res) {
    try {
      const { id } = req.params

      await TeacherModel.deleteOne({ _id: id })

      return res.json({ message: "deleted" })
    } catch ({ message }) {
      return res.json({ error: message })
    }
  }
}

export { TeacherController }
