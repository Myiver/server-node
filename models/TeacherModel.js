import { Schema, model } from "mongoose"

const TeacherSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  patronymic: {
    type: String,
    default: " ",
    trim: true
  },
  institution: { type: Schema.Types.ObjectId, ref: "institutions" },
  subjects: [{ type: Schema.Types.ObjectId, ref: "subjects" }]
})

const TeacherModel = model("teachers", TeacherSchema)

export { TeacherModel }
