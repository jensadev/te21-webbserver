const express = require('express')
const router = express.Router()

// server.js rad 4 och rad 17
router.get('/', function (req, res) {
  res.render('index.njk', { title: 'Välkommen till Tacopalten' })
})

router.get('/about', function (req, res) {
  res.render('about.njk', { title: 'Om Tacopalten' })
})

module.exports = router
