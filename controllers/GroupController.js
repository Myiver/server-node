import { GroupModel } from "../models"

class GroupController {
  /* Create a group */
  static async create(req, res) {
    try {
      const newGroup = new GroupModel({ ...req.body })

      await newGroup.save()

      res.end()
    } catch ({ message }) {
      return res.json({ error: message })
    }
  }
}

export { GroupController }