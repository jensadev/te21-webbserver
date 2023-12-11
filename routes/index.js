const express = require('express')
const router = express.Router()

// server.js rad 4 och rad 17
router.get('/', function (req, res) {
  res.render('index.njk', { title: 'Hello from template' })
})

module.exports = router
