import { hashSync, compareSync } from "bcryptjs"

import { InstitutionModel } from "../models"

class AuthController {
  /* Register a new Institution */
  static async register(req, res) {
    try {
      const { name, login, password } = req.body
      const hashedPassword = hashSync(password)

      const newInstitution = new InstitutionModel({ name, login, password: hashedPassword })
      const savedInstitution = await newInstitution.save()

      // Remove password and __v fields from the response object
      savedInstitution.password = undefined
      savedInstitution.__v = undefined

      res.json({ institution: savedInstitution })
    } catch ({ message }) {
      res.json({ error: message })
    }
  }

  /* Login */
  static async login(req, res) {
    try {
      const { login, password } = req.body

      const institution = await InstitutionModel.findOne({ login }).select({ __v: 0 })

      if (!institution) {
        res.json({ error: "Սխալ մուտքանուն կամ գաղտնաբառ" })
      }

      // If institution is found => check password
      const passwordsAreMatch = compareSync(password, institution.password)

      if (!passwordsAreMatch) {
        res.json({ error: "Սխալ մուտքանուն կամ գաղտնաբառ" })
      }

      // Remove password field from response object
      institution.password = undefined

      res.json({ institution })
    } catch ({ message }) {
      res.json({ error: message })
    }
  }
}

export { AuthController }