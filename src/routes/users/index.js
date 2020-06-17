const express = require(`express`)
const router = express.Router()

// Inner routing
const accounts = require(`./account`)

router.get(`/`, (req, res) => {
  res.json({ message: `Users section` })
})

router.use(`/accounts`, accounts)

module.exports = router