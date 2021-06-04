import { SubjectModel } from "../models"

class SubjectController {
  /* Create a new subject */
  static async create(req, res) {
    try {
      const { key, value } = req.body
      console.log(req.body)

      const newSubject = new SubjectModel({ key, value })

      const savedSubject = await newSubject.save()

      savedSubject.__v = undefined

      return res.json({ subject: savedSubject })
    } catch ({ message }) {
      return res.json({ error: message })
    }
  }

  /* Get one subject by id */
  static async getOne(req, res) {
    try {
      const id = req.params.id

      const subject = await SubjectModel.findById(id)

      if (subject) {
        subject.__v = undefined
        return res.json({ subject })
      }

      return res.json({ error: "Գտնված չէ" })
    } catch ({ message }) {
      return res.json({ error: message })
    }
  }

  /* Get all subjects */
  static async getAll(req, res) {
    try {
      const subjects = await SubjectModel.find({}).select({ __v: 0 })

      res.json({ subjects })
    } catch ({ message }) {
      return res.json({ error: message })
    }
  }
}

export { SubjectController }
