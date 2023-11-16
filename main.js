import "./style.css";
import AudioSystem from "./src/scripts/soundSystemClass";
import Game from "./src/scripts/gameBoardClass";

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  const overlays = document.querySelectorAll(".overlay-text");
  const cards = document.querySelectorAll(".card");

  const game = new Game(100, cards);

  overlays.forEach((overlay) => {
    overlay.addEventListener("click", () => {
      overlay.classList.remove("visible");
      game.startGame();
    });
  });

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      game.flipCards(card);
    });
  });
}
