

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

    createBox()
}
function createBox() {
    const box = document.createElement("div");

    box.id = "test";

    box.style.width = "100px"
    box.style.height = "100px"
    box.style.position = "absolute"
    box.style.top = "100px"
    box.style.left = "100px"
    box.style.backgroundColor = "white"

    const game = document.querySelector(".game-screen");
    game.appendChild(box);


}