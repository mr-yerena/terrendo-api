const bcrypt = require(`bcrypt`)
require(`dotenv`).config()

module.exports = async (text) => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10

  return await bcrypt.hash(text, saltRounds)
}