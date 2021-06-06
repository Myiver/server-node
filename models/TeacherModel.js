import { Schema, model } from "mongoose"

const TeacherSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  patronymic: {
    type: String,
    default: "֊"
  },
  institution: { type: Schema.Types.ObjectId, ref: "institutions" },
  subjects: [{ type: Schema.Types.ObjectId, ref: "subjects" }]
})

const TeacherModel = model("teachers", TeacherSchema)

export { TeacherModel }