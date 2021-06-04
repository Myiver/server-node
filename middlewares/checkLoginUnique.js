import { InstitutionModel } from "../models"

const checkLoginUnique = async (req, res, next) => {
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

export { checkLoginUnique }
