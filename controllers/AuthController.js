import { hashSync, compareSync } from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

import { InstitutionModel } from "../models"

dotenv.config()

class AuthController {
  /* Register */
  static async register(req, res) {
    try {
      const { name, login, password } = req.body
      const lowerLogin = login.toLowerCase()
      const hashedPassword = hashSync(password)

      // Create a new institution
      const newInstitution = new InstitutionModel({
        name,
        login: lowerLogin,
        password: hashedPassword
      })
      const savedInstitution = await newInstitution.save()

      // Remove password and __v fields from the response object
      savedInstitution.password = undefined
      savedInstitution.__v = undefined

      return res.json({ institution: savedInstitution })
    } catch ({ message }) {
      return res.json({ error: message })
    }
  }

  /* Login */
  static async login(req, res) {
    try {
      const { login, password } = req.body
      const lowerLogin = login.toLowerCase()

      const institution = await InstitutionModel.findOne({ login: lowerLogin }).lean()

      if (institution === null) {
        return res.json({ error: "Սխալ մուտքանուն կամ գաղտնաբառ" })
      }

      // If institution is found => check password
      const passwordsAreMatch = compareSync(password, institution.password)

      if (passwordsAreMatch === false) {
        return res.json({ error: "Սխալ մուտքանուն կամ գաղտնաբառ" })
      }

      // Remove password and __v fields from response object
      institution.password = undefined
      institution.__v = undefined

      const token = jwt.sign({ _id: institution._id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
      })

      return res.json({ institution, token })
    } catch ({ message }) {
      return res.json({ error: message })
    }
  }

  /* Verify token */
  static async getVerifiedInstitution(req, res) {
    try {
      const institution = await InstitutionModel.findOne({ _id: req.institution._id }).lean()
      const token = jwt.sign({ _id: institution._id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
      })

      // Remove password and __v fields from response object
      institution.password = undefined
      institution.__v = undefined

      return res.json({ institution, token })
    } catch ({ message }) {
      return res.json({ error: message })
    }
  }
}

export { AuthController }
