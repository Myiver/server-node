import Joi from "@hapi/joi"

export const validateRegister = (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().max(64).required(),
      login: Joi.string().max(64).required(),
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

export const validateLogin = (req, res, next) => {
  try {
    const schema = Joi.object({
      login: Joi.string().max(64).required(),
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