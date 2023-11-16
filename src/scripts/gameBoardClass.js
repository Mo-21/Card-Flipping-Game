import AudioSystem from "./soundSystemClass";

class Game {
  constructor(totalTime, cardsArray) {
    this.totalTime = totalTime;
    this.cardsArray = cardsArray;
    this.remainingTime = totalTime;
    this.timer = document.querySelector(".stopwatch");
    this.ticker = document.querySelector(".flips-number");
    this.music = new AudioSystem();
  }

  startGame() {
    this.cardToCheck = null;
    this.numberOfClicks = 0;
    this.remainingTime = this.totalTime;
    this.matchedCardsArray = [];
    this.busy = true;

    setTimeout(() => {
      this.busy = false;
      this.shuffleCards();
      this.countDown = this.startCountDown();
    }, 500);
    this.hidingCard(); // flip cards to initial position
    this.timer.innerHTML = this.remainingTime;
    this.ticker.innerHTML = this.numberOfClicks;
  }

  flipCards(card) {
    if (this.canFlipCard(card)) {
      this.music.startMainMusic();
      this.numberOfClicks++;
      this.ticker.textContent = this.numberOfClicks;
      card.classList.add("visible");

      if (this.cardToCheck) {
        this.checkForMatch(card);
      } else {
        this.cardToCheck = card;
      }
    }
  }

  checkForMatch(card) {
    if (this.getCardType(card) === this.getCardType(this.cardToCheck)) {
      this.cardMatch(card, this.cardToCheck);
    } else {
      this.cardMisMatch(card, this.cardToCheck);
    }
    this.cardToCheck = null;
  }

  cardMisMatch(card1, card2) {
    this.busy = true;
    setTimeout(() => {
      card1.classList.remove("visible");
      card2.classList.remove("visible");
      this.busy = false;
    }, 500);
  }

  cardMatch(card1, card2) {
    this.matchedCardsArray.push(card1);
    this.matchedCardsArray.push(card2);
    card1.classList.add("matched");
    card2.classList.add("matched");
    if (this.matchedCardsArray.length === this.cardsArray.length)
      this.victory();
  }

  getCardType(card) {
    return card.querySelectorAll(".card-value")[0].src;
  }

  shuffleCards() {
    for (let i = this.cardsArray.length - 1; i > 0; i--) {
      const randomNumber = Math.floor(Math.random() * (i + 1));
      this.cardsArray[i].style.order = randomNumber;
      this.cardsArray[randomNumber].style.order = i;
    }
  }

  canFlipCard(card) {
    return (
      !this.busy &&
      !this.matchedCardsArray.includes(card.textContent) &&
      card !== this.cardToCheck
    );
  }

  startCountDown() {
    return setInterval(() => {
      this.remainingTime--;
      this.timer.innerHTML = this.remainingTime;
      if (this.remainingTime === 0) this.gameOver();
    }, 1000);
  }

  hidingCard() {
    this.cardsArray.forEach((card) => {
      card.classList.remove("visible");
      card.classList.remove("matched");
    });
  }

  gameOver() {
    clearInterval(this.countDown);
    this.music.gameOverSoundMusic();
    const game_over = document.getElementById("vectory-text");
    game_over.classList.add("visible");
  }

  victory() {
    clearInterval(this.countDown);
    this.music.victoryMusic();
    const survived = document.getElementById("vectory-text");
    survived.classList.add("visible");
  }
}
export default Game;
