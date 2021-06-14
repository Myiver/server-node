import Joi from "@hapi/joi"

class Validate {
  /* REGISTRATION */
  static async register(req, res, next) {
    try {
      const schema = Joi.object({
        name: Joi.string().min(4).max(64).required(),
        login: Joi.string().min(4).max(64).required(),
        password: Joi.string().min(6).max(64).required(),
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

  /* LOGIN */
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

  /* NEW TEACHER CREATING */
  static async newTeacher(req, res, next) {
    try {
      const schema = Joi.object({
        firstName: Joi.string().min(2).max(64).required(),
        lastName: Joi.string().min(2).max(64).required(),
        patronymic: Joi.string().pattern(new RegExp(".*")),
        subjects: Joi.array().min(1).required(),
        institutionId: Joi.string().min(0).max(64)
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

  /* NEW GROUP CREATING */
  static async newGroup(req, res, next) {
    try {
      const schema = Joi.object({
        name: Joi.string().min(2).max(64).required(),
        institution: Joi.string().required(),
        teachersAndSubjects: Joi.array().required()
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
