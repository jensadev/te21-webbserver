# Node webbserver

https://expressjs.com/

Bygga en monolit.

## Hello world

- Start terminal, wsl
- Make sure nvm is installed
- mkdir te21-webbserver
- npm init -y
- npm i express
- touch server.js
- edit package.json
    
```json
"scripts": {
    "dev": "node server.js"
  },
```
    
- edit index.js

```javascript
const express = require("express")
const app = express()

const port = process.env.PORT || 3000

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
```

### Statiska filer, html css osv

- mkdir public
- touch public/index.html

```jsx
const express = require("express")
const app = express()

const port = process.env.PORT || 3000

app.use(express.static("public"))

app.get("/hello", (req, res) => {
  res.send("Hello World!")
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
```

- Surfa till http://localhost:3000/ och den kommer visa index.html
- Surfa till http://localhost:3000/hello och den kommer visa Hello World!
- Skapa en mapp i public som heter css
- Skapa en fil i css/ som heter style.css
- Länka till css filen i index.html, sökvägen är absolut från root

## Templating, nunjucks

Med templater så kan vi lättare sammanfoga data med html.

- npm i nunjucks
- mkdir views
- rm public/index.html
- Open index.js

```javascript
const nunjucks = require('nunjucks');
...
const app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});
...
```

### Bättre struktur med route filer

Istället för att skriva all kod i app.js så kan vi flytta ut logik, routes och annat till andra filer. Först ska vi göra en fil för routes.

- mkdir routes
- touch routes/index.js
- Alla filer vi laddar in på det här sättet i node/express är moduler som måste exportera något tillbaka. Detta gör vi med module.exports = router
- Alla routers i router har en req och res som vi kan använda för att skicka och ta emot data. req är request och res är response. Vi kan skicka tillbaka html, json, text osv. Vi kan också skicka tillbaka en vy som vi renderar med templating.

routes/index.js
```javascript
const express = require("express")
const router = express.Router()

router.get("/", function (req, res) {
  res.render('index.njk', { title: 'Hello from template' })
})

module.exports = router
```

- Ändra i server.js

```javascript
...
const indexRouter = require("./routes/index")
...
app.use("/", indexRouter)
```

- touch views/layout.njk

```html
<!DOCTYPE html>
<html lang="sv">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ title }}</title>
    <link rel="stylesheet" href="/css/style.css">
</head>

<body>
    {% block content %}
    {% endblock %}
</body>

</html>
```

- touch views/index.njk

```html
{% extends "layout.njk" %}
{% block content %}
<main>
    <h1>{{ title }}</h1>
</main>
{% endblock %}
```

- npm start, testa att surfa till localhost:3000

## Utvecklingsmiljö

För att underlätta utvecklingen så kan vi använda oss av nodemon som startar om servern varje gång vi ändrar något i koden.

- nodemon för att uppdatera när vi ändrar något.
- npm i -D nodemon
- edit package.json
- "dev": "nodemon -e js,html,njk ./server.js"

## GET

Allt hittils är GET requests. Din klient skickar en request till en url på servern, servern svarar med filer och data.

- Skapa en ny route i routes/index.js

```javascript
router.get("/about", function (req, res) {
  res.render('about.njk', { title: 'About' })
})
```

- Skapa en ny vy i views/about.njk

```html
{% extends "layout.njk" %}
{% block content %}
<main>
    <h1>{{ title }}</h1>
</main>
{% endblock %}
```

- Surfa till localhost:3000/about

### GET parametrar

Vi kan skicka med data i urlen som vi kan använda på servern. Detta kan vara användbart för att filtrera data eller hämta specifik data.

- Skapa en ny route i routes/index.js

```javascript
router.get("/user/:id", function (req, res) {
  res.send(`User id: ${req.params.id}`)
})
```

- Surfa till localhost:3000/user/1
- Surfa till localhost:3000/user/jkf32fjkwjf0szeif9sef

- Med den möjligheten, ser du några eventuella säkerhetsrisker?

### Query parametrar

Vi kan också skicka med data i urlen som vi kan använda på servern. Detta kan vara användbart för att filtrera data eller hämta specifik data.

- Skapa en ny route i routes/index.js

```javascript
router.get("/search", function (req, res) {
  res.send(`Search query: ${req.query.q}`)
})
```

- Surfa till localhost:3000/search?q=hello
- Surfa till localhost:3000/search?q=hello+world

- Med den möjligheten, ser du några eventuella säkerhetsrisker?

### Säkerhet

- Skapa en ny route i routes/index.js

```javascript
router.get("/search", function (req, res) {
  res.send(`Search query: ${req.query.q}`)
})
```

- Surfa till localhost:3000/search?q=<script>alert("hello")</script>
- Surfa till localhost:3000/search?q=<script>alert(document.cookie)</script>
