class AudioSystem {
  constructor() {
    this.flipSound = new Audio("../assets/audio/flip.wav");
    this.gameOverSound = new Audio("../assets/audio/gameOver.wav");
    this.matchSound = new Audio("../assets/audio/match.wav");
    this.victorySound = new Audio("../assets/audio/victory.wav");
    this.startSound = new Audio("../assets/audio/creepy.mp3");
    this.startSound.volume = 0.5;
    this.startSound.loop = true;
  }

  startMainMusic() {
    this.startSound.play();
  }

  pauseMusic() {
    this.startSound.pause;
    this.startSound.currentTime = 0;
  }

  victoryMusic() {
    this.pauseMusic();
    this.victorySound.play();
  }

  matchMusic() {
    this.matchSound.play();
  }

  flipMusic() {
    this.flipSound.play();
  }

  gameOverSoundMusic() {
    this.pauseMusic();
    this.gameOverSound.play();
  }
}

export default AudioSystem;
