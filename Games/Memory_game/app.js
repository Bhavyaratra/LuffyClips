const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#your_score')
const score = document.querySelector('#score')
const output = document.querySelector('#output')

document.addEventListener('DOMContentLoaded', () => {
    //card options
    const cardArray = [
      {
        name: 'blue',
        img: 'images/blue.png'
      },
      {
        name: 'dots',
        img: 'images/dots.png'
      },
      {
        name: 'green',
        img: 'images/green.png'
      },
      {
        name: 'leaf',
        img: 'images/leaf.png'
      },
      {
        name: 'lines',
        img: 'images/lines.png'
      },
      {
        name: 'mix',
        img: 'images/mix.png'
      },
      {
        name: 'red',
        img: 'images/red.png'
      },
      {
        name: 'spiral',
        img: 'images/spiral.png'
      },
      {
        name: 'thunder',
        img: 'images/thunder.png'
      },
      {
        name: 'yellow',
        img: 'images/yellow.png'
      },
      {
        name: 'blue',
        img: 'images/blue.png'
      },
      {
        name: 'dots',
        img: 'images/dots.png'
      },
      {
        name: 'green',
        img: 'images/green.png'
      },
      {
        name: 'leaf',
        img: 'images/leaf.png'
      },
      {
        name: 'lines',
        img: 'images/lines.png'
      },
      {
        name: 'mix',
        img: 'images/mix.png'
      },
      {
        name: 'red',
        img: 'images/red.png'
      },
      {
        name: 'spiral',
        img: 'images/spiral.png'
      },
      {
        name: 'thunder',
        img: 'images/thunder.png'
      },
      {
        name: 'yellow',
        img: 'images/yellow.png'
      }
    ]
  
    cardArray.sort(() => 0.5 - Math.random())
  
    let cardsChosen = []
    let cardsChosenId = []
    let cardsWon = []
  
    //create your board
    function createBoard() {
      for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img')
        card.setAttribute('src', 'images/blank.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        grid.appendChild(card)
      }
    }
  
    //check for matches
    function checkForMatch() {
      const cards = document.querySelectorAll('img')
      const optionOneId = cardsChosenId[0]
      const optionTwoId = cardsChosenId[1]
      
      if(optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        output.textContent = 'You Clicked on the same Card'
      }
      else if (cardsChosen[0] === cardsChosen[1]) {
        output.textContent = 'You found a Match'
        scoreDisplay.textContent += 10;
        cards[optionOneId].setAttribute('src', 'images/white.png')
        cards[optionTwoId].setAttribute('src', 'images/white.png')
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
        cardsWon.push(cardsChosen)
        scoreDisplay.textContent = cardsWon.length*5
      } else {
        scoreDisplay.textContent -= 1;
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        output.textContent = 'Sorry, Try Again'
      }
      cardsChosen = []
      cardsChosenId = []
      //scoreDisplay.textContent = cardsWon.length*5
      if  (cardsWon.length === cardArray.length/2) {
        score.textContent = 'Congrats!'
        scoreDisplay.textContent = 'You found them all!'
        output.textContent = 'Yeepee'
      }
    }
  
    //flip your card
    function flipCard() {
      let cardId = this.getAttribute('data-id')
      cardsChosen.push(cardArray[cardId].name)
      cardsChosenId.push(cardId)
      this.setAttribute('src', cardArray[cardId].img)
      if (cardsChosen.length ===2) {
        setTimeout(checkForMatch, 500)
      }
    }
  
    createBoard()
  })