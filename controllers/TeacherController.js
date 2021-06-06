import { TeacherModel } from "../models"

class TeacherController {
  static async create(req, res) {
    const { firstName, lastName, patronymic, subjects, institutionId } = req.body
    const newTeacher = new TeacherModel({
      firstName,
      lastName,
      patronymic,
      institution: institutionId,
      subjects: [...subjects]
    })

    const savedTeacher = await newTeacher.save()

    savedTeacher.__v = undefined

    // TeacherModel
    //   .findById(savedTeacher._id)
    //   .populate("institution")
    //   .populate("subjects")
    //   .exec((err, result) => {
    //     if (err) {
    //       return res.json({ error: err.message })
    //     }

    //     res.json({ teacher: result })
    //   })

    res.json({ teacher: savedTeacher })

  }
}

export { TeacherController }