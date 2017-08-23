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
let guessCount = 0

function guessChange() {
  if (randomWord.length <= 9) {
    guessCount = 8
  } else if
    (randomWord.length <= 13)
    guessCount = 12
   else {
    guessCount = 16
   }
}

guessChange()

app.get("/", function(req, res) {
  let blanks = randomWord.split('')
  let blankSpace = false
  for (var i = 0; i < randomWord.length; i++) {
    if (lettersGuessed.indexOf(randomWord[i]) >= 0) {
      blanks[i] = randomWord[i]
    } else {
      blanks[i] = "_"
      blankSpace = true
    }
  }
  if (!blankSpace) {
    res.redirect("/win")
  } else {
    res.render("index", {
      lettersGuessed: lettersGuessed,
      blanks: blanks,
      randomWord: randomWord,
      guessCount: guessCount,
    })
  }
})

app.get("/lost", function(req, res) {
  res.render('lost', {});
});

app.get("/win", function(req, res) {
  res.render('win', {});
});

app.post('/', function (req, res, next) {
  lettersGuessed.push(req.body.letter)
  // let blanks = ""
  // ALL THE DUMB SHIT I'VE TRIED TO DECLARE WINNER
  // let testArray = []
  // let blanks = randomWord.split('')
  // for (var i = 0; i < randomWord.length; i++) {
  //   if (lettersGuessed.indexOf(randomWord[i]) >= 0) {
  //     // blanks[i] = randomWord[i]
  //     testArray.push(blanks[i])
  //      if (testArray === randomWord.split('')){
  //     res.redirect("/win")
  //   }
  //   }
  // SEPARATE DUMB SHIT
  // let blanks = randomWord.split('')
  // let winner = blanks.join('')
  // // for (var i = 0; i < lettersGuessed.length; i++) {
  // END OF DUMB SHIT

  // is each random word character guessed yet?
  // const correctLetters = randomWord.split('')
  // let foundMissingLetter = false
  // for (var i = 0; i < correctLetters.length; i++) {
  //   if (lettersGuessed.indexOf(correctLetters[i]) < 0){
  //     foundMissingLetter = true
  //   }
  // }

  // if (!foundMissingLetter) {
    // res.redirect("/win")
  // }
  // else {
    guessCount = guessCount - 1
  // }
    if (guessCount === 0) {
    res.redirect("/lost")
  }
  //  }
  res.redirect('/')
})

// HOST MODE FOR ADDRESS 0.0.0.0:3000
app.listen(3000, function() {
  console.log("Express On 3000")
})
