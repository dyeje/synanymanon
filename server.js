const express = require('express')
const moby = require('moby')
const app = express()

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}));

var spicy = (req, res) => {
  res.send(moby.search(req.body.word))
}

app.post('/', spicy)

app.listen(3000, () => console.log('Example app listening on port 3000!'))