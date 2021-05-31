import { InstitutionModel } from "../models"

const checkLoginUnique = async (req, res, next) => {
  try {
    const { login } = req.body
    const lowerLogin = login.toLowerCase()

    const institution = await InstitutionModel.findOne({ login: lowerLogin })

    if (institution) {
      return res.json({ error: `"${login}" մուտքանունն արդեն զբաղված է` })
    }

    next()
  } catch ({ message }) {
    res.json({ error: message })
  }
}

export { checkLoginUnique }