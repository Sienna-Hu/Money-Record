import mongoose from "mongoose"
import Person from "./Person.js"
import Tag from "./Tag.js"
import User from "./User.js"

const recordSchema = new mongoose.Schema({
  user: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    required: true
  },
  tag: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  splitNum: {
    type: Number,
    default: 1
  },
  splitpp: {
    type: [String],
    required: false
  },
  hasCollected: {
    type: Boolean,
    default: false
  }
})

const Record = mongoose.model('Record', recordSchema)
export default Record