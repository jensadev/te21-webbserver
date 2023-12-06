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
- Redigera server.js

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

- Skapa och redigera views/index.njk

```html
<h1>{{title}}</h1>
```

- Redigera server.js

```javascript
app.get("/", (req, res) => {
  res.render('index.njk', { title: 'Hello from template' })
})
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

# Templater, layout och att återanvända

Vi ska skapa en layout för sidan och vi ska skapa en bit för menyn som vi kan återanvända på alla sidor.

För att lägga till något som ska visas eller läsas in på alla sidor så ändrar vi i layout.njk. Detta är en mall som alla andra sidor ärver från.

- Skapa en mapp i views som heter partials
- Skapa en fil i partials som heter header.njk

```html
<header>
    <nav>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
        </ul>
    </nav>
</header>
```

- Lägg till i layout.njk

```html

<body>
    {% include "partials/header.njk" %}
    {% block content %}
    {% endblock %}
</body>
```

Om vi vill så kan vi skapa ett block för header eller navigationen, det är användbart om innehållet i menyn ska ändras på olika sidor.

## Uppgift

### Skapa en layout och en navbar

Använd en av de layouter som vi tidigare arbetat med i webbutvecklingen.
Du hittar exempel på https://jensa.dev/resurser/ , centrerat sidebar eller liknande. Du kan även använda dig av en av de navbar exempel som finns på sidan.
Du får självklart göra något eget om så är fallet, men sikta på användbarhet.

### Innehåll

Förstasidan (index) behöver lite innehåll. Skriv något välkomnande och lägg till en bild. Du kan använda dig av lorem ipsum för att fylla sidan med text.

### Skapa en about sida

Skapa en about sida som använder sig av layouten och navbar. Du kan använda dig av lorem ipsum för att fylla sidan med text.

### Skapa en footer

Skapa en footer som du lägger till i layouten. För att göra det följer du samma princip som för header. Skapa en partials/footer.njk och inkludera den i layouten.

## Positiva förbättringar utifrån att vi använder oss av en server

Vi kan skicka med sidans url till templaten på sidan för att indikera vilken sida vi är på. Detta är användbart om vi vill markera vilken sida vi är på i menyn.

Vi kan skapa en variabel i server.js som vi skickar med till alla sidor. Detta gör vi med res.locals. Detta är en variabel som är tillgänglig i alla sidor. 
Det vi skapar är en middleware som körs innan vi skickar tillbaka sidan. Detta gör vi med app.use(). Metoden next() gör att vi går vidare till nästa middleware, det vill säga att vi skickar tillbaka sidan.

`server.js`
```javascript
app.use(function (req, res, next) {
  res.locals.url = req.originalUrl
  next()
})
```

`header.njk`
```html
    <ul class="nav">
      <li>
        <a href="/" class="{{'active' if url === '/'}}">Home</a>
      </li>
      <li><a href="/about" class="{{'active' if url === '/about'}}">About us</a></li>
      <li><a href="/contact" class="{{'active' if url === '/contact'}}">Contact</a></li>
    </ul>
```

`style.css`
```css
.nav {
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
}
.nav .active {
  font-weight: bold;
}
```

## Uppgift

