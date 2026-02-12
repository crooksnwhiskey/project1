

const startButton = document.getElementById("play-button");
const titleScreen = document.getElementById("title");

startButton.addEventListener("click", () => {
    startGame();
});

function startGame() {
    const title = document.querySelector(".title-screen");
    const game = document.querySelector(".game-screen");
    title.style.display = "none";
    game.style.display = "block";


}