import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const verifyToken = (req, res, next) => {
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
