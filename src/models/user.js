const mongoose = require(`mongoose`)
const Schema = mongoose.Schema
const jwt = require(`jsonwebtoken`)
require(`dotenv`).config()

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  last_name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    min: 8,
    required: true,
  },
  phone: String,
  valid_profile: {
    type: Boolean,
    default: false,
  },
  validation_hash: {
    type: String,
    default: new Date().getTime()
  }
})

userSchema.methods.generateAuthToken = async () => {
  const token = jwt.sign({ _id: this._id, name: this.name, role: "user", valid: this.valid_profile }, process.env.JWT_PRIVATE_KEY)
  return token
}

userSchema.methods.generateValidationHash = async () => {
  const timestamp = new Date().getTime()
  return timestamp
}

module.exports = mongoose.model(`User`, userSchema)