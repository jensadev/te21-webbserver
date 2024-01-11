const express = require('express')
const router = express.Router()

// Ny fil, routes/xmas.js
router.get('/', function (req, res) {
  res.render('card.njk', { title: 'Julkortsakuten' })
})

router.post('/', function (req, res) {
  console.log(req)
  // res.json(req.body)
  res.render('card.njk', {
    title: 'Julkortsakuten',
    name: req.body.name,
    greeting: req.body.greeting,
  })
})

module.exports = router
