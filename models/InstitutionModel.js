import { Schema, model } from "mongoose"

const InstitutionSchema = new Schema({
  name: String,
  login: String,
  password: String
})

const InstitutionModel = model("institutions", InstitutionSchema)

export { InstitutionModel }