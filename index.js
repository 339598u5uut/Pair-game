const form = document.querySelector('.form')
const input = document.querySelector('.input')
let value
const buttonForm = document.querySelector('.button-form')
const container = document.querySelector('.container')
const timer = document.querySelector('.timer')
const button = document.querySelector('.button')
timer.textContent = null

function createCard() {
    const card = document.createElement('li')
    const cardFront = document.createElement('div')
    const cardBack = document.createElement('div')
    cardFront.classList.add('front')
    cardBack.classList.add('back')
    card.classList.add('card')
    card.append(cardFront)
    card.append(cardBack)
    return card
}

function formInvisible() {
    form.classList.add('form_invisible')
}

function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array
}

function startNewGame() {
    setTimeout(function() {
        button.classList.add('button_animation')
    }, 1000)

    button.onclick = function() {
        window.location.reload()
    }
}

function timerForPlay() {
    timer.classList.remove('timer_invisible')
    setTimeout(function() {
        timer.textContent = 60
        const time = setInterval(function() {
            timer.textContent--
            if (timer.textContent === '0') {
                clearInterval(time)
                container.style.pointerEvents = 'none'
                startNewGame()
            }
        }, 1000)
    }, 1500)
}

const arrayCards = []
let result = 4 ** 2

function resizeContainer() {
    container.style.width = 90 * Math.sqrt(result) + 'px'
    container.style.height = 110 * Math.sqrt(result) + 'px'
    if (value % 2 === 1 && value > 10 && value < 4) {
        result = 4 ** 2
    }
}

buttonForm.addEventListener('click', function() {
    value = input.value
    timerForPlay()
    if (value % 2 === 0 && value <= 10 && value >= 4) {
        result = value ** 2
        resizeContainer()
    } else {
        alert(
            'Вы ввели некорректные данные. Для увеличения количества карт введите четное число от 4 до 10.'
        )
        result = 4 ** 2
        value = 4
        resizeContainer()
    }

    const fragment = new DocumentFragment()
    for (let i = 0; i < result; i++) {
        arrayCards.push(Math.trunc(i / 2 + 1))
    }
    shuffleCards(arrayCards)
    for (let i = 0; i < result; i++) {
        const card = createCard()
        const cardBack = card.querySelector('.back')
        cardBack.textContent = arrayCards[i]
        card.dataset.number = cardBack.textContent
        if (value >= 8) {
            card.classList.add('card_small')
            container.style.width = 40 * Math.sqrt(result) + 'px'
            container.style.height = 60 * Math.sqrt(result) + 'px'
            cardBack.classList.add('back-font-small')
        }
        fragment.append(card)
        container.append(fragment)
        formInvisible()
    }
})

const pair = []
const arrayWin = []
container.onclick = function(event) {
    const card = event.target.closest('.card')

    function flipCard() {
        card.classList.add('flip')
    }
    flipCard()
    pair.push(card)
    const [firstCard, secondCard] = pair

    function reversCard() {
        setTimeout(function() {
            firstCard.classList.remove('flip')
            secondCard.classList.remove('flip')
        }, 500)
    }

    if (
        pair.length === 2 &&
        firstCard.dataset.number === secondCard.dataset.number
    ) {
        pair.splice(0, 2)
        arrayWin.push(firstCard, secondCard)
    }

    if (
        pair.length === 2 &&
        firstCard.dataset.number !== secondCard.dataset.number
    ) {
        pair.splice(0, 2)
        setTimeout(reversCard, 300)
    }

    if (arrayWin.length === arrayCards.length) {
        container.style.pointerEvents = 'none'
        startNewGame()
    }
}
