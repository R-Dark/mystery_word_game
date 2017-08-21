const express = require("express")
const app = express()
const mustache = require("mustache-express")
const bodyParser = require("body-parser")
const session = require("express-session")
const lowercase = require("express-lowercase-paths")
const expressValidator = require("express-validator")
const words = require("./words")
const randomWord = words.randomWord
app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: false
}))
var sess = {
  secret: "robsite",
  cookie: {},
  saveUninitialized: true,
  resave: true
}
app.use(session(sess))
app.use(lowercase())
app.use(expressValidator())
// END OF PACKAGE CALLS AND USES

let lettersGuessed = []
let word = []
let answerArray = []
let answer = ''
let guessCount = 0

app.get("/", function(req, res) {
  let blanks = randomWord.split('')
  for (var i = 0; i < randomWord.length; i++) {
    if( lettersGuessed.indexOf(randomWord[i])){
      blanks.push("_")
    }  else {
      blanks.push(randomWord[i])
    }
  }
  res.render("index", {
    lettersGuessed: lettersGuessed,
    blanks: blanks,
    answer: answer,
    randomWord: randomWord
  })
})

app.post("/", function(require, response) {
  lettersGuessed.push(require.body.letter)
  response.redirect('/');
})


// app.get("/", function(req, res) {
//   let blanks = []
//   for (var i = 0; i < randomWord.length; i++) {
//     blanks.push('_')
//   }
//   res.render("index", {
//     lettersGuessed: lettersGuessed,
//     blanks: blanks,
//     answer: answer,
//     randomWord: randomWord
//   })
// })
//
//
//
// app.post("/", function(require, response) {
//   blanks = randomWord.split('')
//   lettersGuessed.push(require.body.letter)
//   response.redirect('/');
// })

app.get("/about", function(req, res) {
  res.render('about', {})
})

// function reset () {
//   blanks = []
// }

// HOST MODE FOR ADDRESS 0.0.0.0:3000
app.listen(3000, function() {
  console.log("Express On 3000")
})
