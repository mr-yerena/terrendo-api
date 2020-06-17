const express = require(`express`)
const router = express.Router()

const users = require(`./users`)

router.get('/', (req, res) => {
  res.status(200).json({ message: `You just arrived!`})
})

router.use(`/users`, users)

module.exports = router