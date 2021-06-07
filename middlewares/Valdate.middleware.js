import Joi from "@hapi/joi"

class Validate {
  static async register(req, res, next) {
    try {
      const schema = Joi.object({
        name: Joi.string().min(4).max(64).required(),
        login: Joi.string().min(4).max(64).required(),
        password: Joi.string().min(6).max(64).required()
      })

      const { error } = schema.validate(req.body)

      if (error) {
        return res.json({ error: error.details[0].message })
      }

      return next()
    } catch ({ message }) {
      return res.json({ error: message })
    }
  }

  static async login(req, res, next) {
    try {
      const schema = Joi.object({
        login: Joi.string().min(4).max(64).required(),
        password: Joi.string().min(6).max(64).required()
      })

      const { error } = schema.validate(req.body)

      if (error) {
        return res.json({ error: error.details[0].message })
      }

      return next()
    } catch ({ message }) {
      return res.json({ error: message })
    }
  }

  static async newTeacher(req, res, next) {
    try {
      const schema = Joi.object({
        firstName: Joi.string().min(2).max(64).required(),
        lastName: Joi.string().min(2).max(64).required(),
        subjects: Joi.array().min(1).required()
      })

      const { error } = schema.validate(req.body)

      if (error) {
        return res.json({ error: error.details[0].message })
      }

      return next()
    } catch ({ message }) {
      return res.json({ error: message })
    }
  }
}

export { Validate }
