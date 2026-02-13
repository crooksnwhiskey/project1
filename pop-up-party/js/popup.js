

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

    createRink()
    createPuck()
}
function createRink() {
    const rink = document.createElement("div");

    rink.id = "rink";

    rink.style.width = "450px"
    rink.style.height = "650px"
    rink.style.position = "relative"
    rink.style.borderRadius = "70px"
    rink.style.border = "10px solid #3d4dff"

    rink.style.backgroundColor = "#b8e2e1"

    const game = document.querySelector(".game-screen");
    game.appendChild(rink);
}

let puckX;
let puckY;
const puck = {

    startX: 225,
    startY: 325,
    speed: 3,
    radius: 10

};
function createPuck() {
    const puck = document.createElement("div");
    puck.id = "puck";

    puck.style.width = "75px"
    puck.style.height = "75px"
    puck.style.backgroundColor = "#000000"
    puck.style.borderRadius = "50%"
    puck.style.position = "absoute"


    const rink = document.getElementById("rink");
    rink.appendChild(puck);
}