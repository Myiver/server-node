import { Schema, model } from "mongoose"

const InstitutionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

const InstitutionModel = model("institutions", InstitutionSchema)

export { InstitutionModel }