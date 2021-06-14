import { Schema, model } from "mongoose"

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  institution: { type: Schema.Types.ObjectId, ref: "institutions" },
  teachersAndSubjects: [
    {
      teacher: { type: Schema.Types.ObjectId, ref: "teachers", required: true },
      subject: { type: Schema.Types.ObjectId, ref: "subjects", required: true }
    }
  ]
})

const GroupModel = model("groups", GroupSchema)

export { GroupModel }
