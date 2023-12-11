const express = require('express')
const nunjucks = require('nunjucks')

const indexRouter = require('./routes/index')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
})

const port = process.env.PORT || 3000

app.use(express.static('public'))

app.use((req, res, next) => {
  res.locals.url = req.originalUrl
  next()
})

app.use('/', indexRouter)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
