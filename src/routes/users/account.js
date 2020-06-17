const express = require(`express`)
const router = express.Router()
const accountService = require(`./../../services/users/account`)

router.get(`/`, (req, res) => {
  res.json({ message: `Users section account` })
})

router.post('/', accountService.create)

module.exports = router