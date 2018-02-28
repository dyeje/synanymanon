const express = require('express')
const moby = require('moby')
const natural = require('natural');
const app = express()

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}));

var spicy = (req, res) => {
  tokenizer = new natural.TreebankWordTokenizer()
  tokens = tokenizer.tokenize(req.body.sentence)
  token_synonyms = tokens.map((t) => {
    // only synonym 50% of the time
    if (Math.random() >= 0.5) {
      synonyms = moby.search(t)
      return synonyms[Math.floor(Math.random() * synonyms.length)];
    } else {
      return t
    }
  })
  res.send(token_synonyms.join(' '))

}

app.post('/', spicy)

app.listen(2999, () => console.log('Port 2999 Listening'))