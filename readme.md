# Node webbserver

https://expressjs.com/

Bygga en, monolit.

## Hello world

- Start terminal, wsl
- Make sure nvm is installed
- cd code
- mkdir te21-webbserver
- cd te21-webbserver
- npm init -y
- npm i express
- touch server.js
- redigera filen package.json
    
```json
"scripts": {
    "dev": "node server.js"
  },
```
    
- edit server.js

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
