import { Schema, model } from "mongoose"

const SubjectSchema = new Schema({
  key: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
})

export const SubjectModel = model("subjects", SubjectSchema)