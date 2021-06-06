import jwt from "jsonwebtoken"
import dotenv from "dotenv"

import { InstitutionModel } from "../models"

dotenv.config()

class Auth {
  static async verifyToken(req, res, next) {
    if (req.headers["authorization"]) {
      try {
        const token = req.headers["authorization"].split(" ")[1]

        if (!token) {
          return res.json({ error: "Auth error" })
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (err) {
            return res.json({ error: err.message })
          }

          req.institution = decoded

          return next()
        })
      } catch ({ message }) {
        return res.json({ error: "Auth error" })
      }
    } else {
      return res.json({ error: "No tokens provided" })
    }
  }

  static async checkLoginUnique(req, res, next) {
    try {
      let { login } = req.body
      login = login.toLowerCase()

      const institution = await InstitutionModel.findOne({ login })

      if (institution) {
        return res.json({ error: `"${login}" մուտքանունն արդեն զբաղված է` })
      }

      return next()
    } catch ({ message }) {
      return res.json({ error: message })
    }
  }
}

export { Auth }