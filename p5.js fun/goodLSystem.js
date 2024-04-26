// wszystko z coding traina ofc
// Zjedz troche na dol i masz pare opcji
// Slidery kontroluja kat i dlugosc galezi
// Masz zakomentowane pare innych pozycji startowych (czyli axiom, rules i angle)
// kazde jest w miare ladne wiec warto poprobowac
// tylko 2 dzialaja ale moze keidys naprawie xd
// szybkie comenty to ctrl + /



let axiom = "F"
var rules = [["F", "FF+[+F-F-F]-[-F+F+F]"]]
var angle = 25

// // Fractal plant
// let axiom = "X"
// var rules = [
//   ["X", "F+[[X]-X]-F[-FX]+X"],
//   ["F", "FF"],
// ]
// var angle = 25


// na dole nie dzialaja xd
//Dragon curve
// let axiom ="F"
// var rules = [
//   ["F", "F+G"],
//   ["G", "F-G"],
// ]
// var angle = 90

// Sierpinski Triangle
// let axiom = "F-G-G"
// var rules = [
//   ["F", "F-G+F+G-F"],
//   ["G", "GG"],
// ]
// var angle = 120

const start = axiom
var p = {
  len: 6,
  col: 51,
}
function generateNewWord(word, l) {
  let newWord = ""
  for (let i = 0; i < l; i++) {
    var current = word[i]

    var ruleFound = false
    for (let j = 0; j < rules.length; j++) {
      if (current == rules[j][0]) {
        newWord += rules[j][1]
        ruleFound = true
        break
      }
    }
    if (ruleFound == false) {
      newWord += current
    }
  }
  // console.log(newWord)
  return newWord
}

function Turtle(word, l) {
  background(p.col)
  translate(width / 2, height)
  stroke(255, 100)
  for (let i = 0; i < l; i++) {
    var current = word[i]

    if (current == "F") {
      line(0, 0, 0, -p.len)
      translate(0, -p.len)
    } else if (current == "+") {
      rotate(angle)
    } else if (current == "-") {
      rotate(-angle)
    } else if (current == "[") {
      push()
    } else if (current == "]") {
      pop()
    }
  }
}

var angleSlider
var lenSlider
var drawButton
var deleteButton
const angle2 = angle
const len2 = p.len

function setup() {
  createCanvas(windowWidth, windowHeight-150)
  background(p.col)

  angleSlider = createSlider(0, 120, angle, 1)
  lenSlider = createSlider(1, 30, p.len, 1)
  

  drawButton = createButton("generate")
  drawButton.size(200, 100)
  drawButton.mousePressed(generate)

  resetButton = createButton("reset")
  resetButton.size(200, 100)
  resetButton.mousePressed(resett)
}

function draw() {
  //cos sie jebie z wyswietlaniem
  fill(0, 153, 115)
  noStroke()
  textSize(50)
  var str1 = "angle: " + angleSlider.value()
  var str2 = "len: " + lenSlider.value()
  text(str1 ,windowWidth*0.05, windowHeight*0.1)
  text(str2 ,windowWidth*0.05, windowHeight*0.15)
}

function generate() {
  
  angle = radians(angleSlider.value())
  p.len = lenSlider.value()
  axiom = generateNewWord(axiom, axiom.length)
  Turtle(axiom, axiom.length)
}

function resett() {
  axiom = start
  resetMatrix()
  clear()
  console.clear()
  background(p.col)
  
}
