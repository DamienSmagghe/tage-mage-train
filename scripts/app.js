let selectInput = document.querySelector("#training");
let answerInput = document.querySelector("#answerInput");
let answer = this.document.querySelector(".answer");
let wrong = this.document.querySelector(".wrong");
let good = this.document.querySelector(".good");
let primeList = this.document.querySelector(".primeNumberList");
let errorCounter = this.document.querySelector(".errorsCount");
let answerCounter = this.document.querySelector(".answersCount");

let errors = 0;
let answers = 0;
let selectedTraining = selectInput.value;
let currentQuestionInstance;

let chrono = document.querySelector(".timer"),
  seconds = 0,
  minutes = 0,
  hours = 0,
  t;

timer();

const generateQuestion = (_selectedTraining) => {
  answerInput.value = "";
  primeList.innerHTML = "";
  switch (_selectedTraining) {
    case "multiplication":
      currentQuestionInstance = new Multiplication();
      break;
    case "square":
      currentQuestionInstance = new Square();
      break;
    case "cube":
      currentQuestionInstance = new Cube();
      break;
    case "primeNumber":
      if (
        currentQuestionInstance !== "primeNumber" ||
        currentQuestionInstance.isAllTold()
      ) {
        currentQuestionInstance = new PrimeNumber();
      }
      break;
    default:
      document.querySelector(".questions").innerHTML =
        "Les questions apparaissent ici";
      break;
  }
};

answerInput.addEventListener("keypress", (_e) => {
  if (_e.keyCode == 13) {
    if (selectedTraining === "primeNumber") {
      answer.innerHTML = "";
      if (currentQuestionInstance.response(answerInput.value)) {
        wrong.style.display = "none";
        good.style.display = "inline";
      } else {
        good.style.display = "none";
        wrong.style.display = "inline";
      }
      setTimeout(() => {
        wrong.style.display = "none";
        good.style.display = "none";
      }, 5000);
      answerInput.value = null;
      currentQuestionInstance.toldNumbers.sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      });
      primeList.innerHTML = currentQuestionInstance.toldNumbers;
      if (currentQuestionInstance.isAllTold()) {
        answer.innerHTML = "Tous les nombres premiers ont étés dits !";
      }
    } else {
      answer.innerHTML = currentQuestionInstance.answer;
      if (currentQuestionInstance.response(answerInput.value))
        good.style.display = "inline";
      else wrong.style.display = "inline";

      generateQuestion(selectedTraining);
      setTimeout(() => {
        wrong.style.display = "none";
        good.style.display = "none";
      }, 5000);
    }
  }
});

function add() {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }
  }

  chrono.textContent =
    (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
    ":" +
    (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
    ":" +
    (seconds > 9 ? seconds : "0" + seconds);

  timer();
}
function timer() {
  t = setTimeout(add, 1000);
}

function updateQuestion(_e) {
  errors = 0;
  answers = 0;
  answerCounter.innerHTML = "0 propostions";
  errorCounter.innerHTML = "0 erreur(s)";
  selectedTraining = selectInput.value;
  generateQuestion(selectedTraining);
  chrono.textContent = "00:00:00";
  seconds = 0;
  minutes = 0;
  hours = 0;
}

class PrimeNumber {
  constructor() {
    this.primeNumbers = [
      2,
      3,
      5,
      7,
      11,
      13,
      17,
      19,
      23,
      29,
      31,
      37,
      41,
      43,
      47,
      53,
      59,
      61,
      67,
      71,
      73,
      79,
      83,
      89,
      97,
      101,
    ];
    this.toldNumbers = [];
    this.errors = 0;
    this.question = document.querySelector(
      ".questions"
    ).innerHTML = `Tapez les nombres premiers compris entre 1 et 102 ?`;
  }

  isPrime(_value) {
    return this.primeNumbers.includes(_value);
  }

  isAllTold() {
    this.toldNumbers = this.toldNumbers.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
    if (this.toldNumbers.join() === this.primeNumbers.join()) return true;
    return false;
  }

  response(_value) {
    updateAnswer();
    _value = parseInt(_value);
    if (this.isPrime(_value)) {
      if (!this.toldNumbers.includes(_value)) this.toldNumbers.push(_value);
      return true;
    } else {
      updateError();
      return false;
    }
  }
}

class Multiplication {
  constructor() {
    this.firstProduct = Math.ceil(Math.random() * 20);
    this.secondProduct = Math.ceil(Math.random() * 20);
    this.answer = this.firstProduct * this.secondProduct;
    this.question = document.querySelector(
      ".questions"
    ).innerHTML = `${this.firstProduct} x ${this.secondProduct} ?`;
  }

  response(_value) {
    updateAnswer();
    _value = parseInt(_value);
    if (this.answer === _value) return true;
    else {
      updateError();
      return false;
    }
  }
}
class Square {
  constructor() {
    this.square = Math.ceil(Math.random() * 25);
    this.answer = this.square * this.square;
    this.question = document.querySelector(
      ".questions"
    ).innerHTML = `${this.square} ^2 ?`;
  }

  response(_value) {
    updateAnswer();
    _value = parseInt(_value);
    if (this.answer === _value) return true;
    else {
      updateError();
      return false;
    }
  }
}
class Cube {
  constructor() {
    this.cube = Math.ceil(Math.random() * 20);
    this.answer = this.cube * this.cube * this.cube;
    this.question = document.querySelector(
      ".questions"
    ).innerHTML = `${this.cube} ^3 ?`;
  }

  response(_value) {
    updateAnswer();
    _value = parseInt(_value);
    if (this.answer === _value) return true;
    else {
      updateError();
      return false;
    }
  }
}
const updateError = () => {
  errors++;
  errorCounter.innerHTML = `${errors} erreur(s)`;
};
const updateAnswer = () => {
  answers++;
  answerCounter.innerHTML = `${answers} propositions`;
};
