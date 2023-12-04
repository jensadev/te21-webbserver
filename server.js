const express = require('express')
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
})

const port = process.env.PORT || 3000

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', indexRouter)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
