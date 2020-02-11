let selectInput = document.querySelector('#training')
let answerInput = document.querySelector('#answerInput')
let answer = this.document.querySelector('.answer')
let wrong = this.document.querySelector('.wrong')
let good = this.document.querySelector('.good')

let selectedTraining = selectInput.value
let currentQuestionInstance

function updateQuestion(_e) {
    selectedTraining = selectInput.value
    generateQuestion(selectedTraining)
}

const generateQuestion = (_selectedTraining) => {
    answerInput.value = ''
    switch(_selectedTraining) {
        case 'multiplication':
            currentQuestionInstance = new Multiplication()
            break;
        case 'square':
            currentQuestionInstance = new Square()
            break;
        case 'cube':
            currentQuestionInstance = new Cube()
            break;
    }
    
}


answerInput.addEventListener('keypress', (_e)=> {
    if(_e.keyCode == 13) {
        answer.innerHTML = currentQuestionInstance.answer
        if (currentQuestionInstance.response(answerInput.value)) good.style.display = 'inline'
        else wrong.style.display = 'inline'

        generateQuestion(selectedTraining)
        setTimeout(()=> {
            wrong.style.display = 'none'
            good.style.display = 'none'
        }, 5000)
    }
})
answerInput.addEventListener('focusout', (_e)=> {
    if(_e.keyCode == 13) {
        answer.innerHTML = currentQuestionInstance.answer
        if (currentQuestionInstance.response(answerInput.value)) good.style.display = 'inline'
        else wrong.style.display = 'inline'

        generateQuestion(selectedTraining)
        setTimeout(()=> {
            wrong.style.display = 'none'
            good.style.display = 'none'
        }, 5000)
    }
})


// class PrimeNumber {
//     constructor() {
//         this.primeNumbers = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101]
//         this.toldNumbers = []
//         this.question = document.querySelector('.questions').innerHTML = `Tapez les nombres premiers compris entre 1 et 102 ?`
//     }

//     isPrime(_value) {
//         return this.primeNumbers.includes(_value)
//     }

//     isAllTold() {
//         this.toldNumbers = this.toldNumbers.sort()
//         if (this.toldNumbers === this.primeNumbers) return true
//         return false
//     }

//     response(_value) {
//         _value = parseInt(_value)
//         if (this.isPrime(_value)) {
//             if(!this.toldNumbers.includes(_value)) this.toldNumbers.push(_value)
//             return true
//         }
//         else {
//             return false
//         }
//     }
// }

class Multiplication {
    
    constructor() {
        this.firstProduct = Math.ceil(Math.random() * 20)
        this.secondProduct = Math.ceil(Math.random() * 20)
        this.answer = this.firstProduct * this.secondProduct
        this.question = document.querySelector('.questions').innerHTML = `${this.firstProduct} x ${this.secondProduct} ?`
    }

    response(_value) {
        _value = parseInt(_value)
        if (this.answer === _value) return true
        else return false
    }

}
class Square {
    
    constructor() {
        this.square = Math.ceil(Math.random() * 25)
        this.answer = this.square * this.square
        this.question = document.querySelector('.questions').innerHTML = `${this.square} ^2 ?`
    }

    response(_value) {
        _value = parseInt(_value)
        if (this.answer === _value) return true
        else return false
    }

}
class Cube {
    
    constructor() {
        this.cube = Math.ceil(Math.random() * 12)
        this.answer = this.cube * this.cube * this.cube
        this.question = document.querySelector('.questions').innerHTML = `${this.cube} ^3 ?`
    }

    response(_value) {
        _value = parseInt(_value)
        if (this.answer === _value) return true
        else return false
    }

}