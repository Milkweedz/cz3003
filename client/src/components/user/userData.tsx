import namor from 'namor'

var totalQuestion =0
var totalCorrect =0 
const range = len => {  
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}


const newEntry = () => {
  var x = Math.floor(Math.random() * 100)
  totalQuestion += x
  var y = Math.floor(Math.random() * x)
  totalCorrect +=y
  var date = randomDate(new Date(2020, 0, 1), new Date())
  
  return {
    timePlayed: date.toUTCString(),
    questionAnswered: x,
    correctAnswer: y,     
  }
}

export function getQuestion() {
    return totalQuestion
}

export function getCorrect() {
    return totalCorrect
}
export function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth]
    return range(len).map(d => {
      return {
        ...newEntry(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}