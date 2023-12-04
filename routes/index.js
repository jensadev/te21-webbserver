const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.render('index.njk', { title: 'Hello from template' })
})

router.post('/hello', function (req, res) {
  console.log(req.body)
  res.send(`Hello ${req.body.name}`)
})

module.exports = router
