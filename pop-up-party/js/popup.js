

const startButton = document.getElementById("play-button");
const titleScreen = document.getElementById("title");
let mouseX = 0
let mouseY = 0

startButton.addEventListener("click", () => {
    startGame();
});

//making constrain function because my previous code to constrain thing burnt an image into my screen
function constrain(value, low, high) {
    return Math.min(Math.max(value, low), high);
}

function startGame() {
    const title = document.querySelector(".title-screen");
    const game = document.querySelector(".game-screen");
    const rink = document.getElementById("rink");

    title.style.display = "none";
    game.style.display = "block";
    window.requestAnimationFrame(draw)

    createRink();
    createPuck();
    createUser();

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



const puck = {

    x: 225,
    y: 325,
    speed: 3,
    velocity: 3,
    width: 75,
    radius: 10

};
let puckObject;

function createPuck() {
    puckObject = document.createElement("div");
    puckObject.id = "puck";

    puckObject.style.width = "75px"
    puckObject.style.height = "75px"
    puckObject.style.backgroundColor = "#000000"
    puckObject.style.borderRadius = "50%"
    puckObject.style.position = "absolute"


    const rink = document.getElementById("rink");
    rink.appendChild(puckObject);
    rink.addEventListener("mousemove", rinkMove)
}
function movePuck() {
    const rink = document.getElementById("rink");
    const maxWidth = rink.clientWidth - puck.width;
    const maxHeight = rink.clientHeight - puck.width;

    puck.x += puck.speed;
    puck.y += puck.speed;

    if (puck.x <= 0 || puck.x >= maxWidth) {
        puck.speed = puck.speed * -1;

    }
    if (puck.y <= 0 || puck.y >= maxHeight) {
        puck.speed = puck.speed * -1;
    }
    if (puckObject) {
        puckObject.style.left = puck.x + "px"
        puckObject.style.top = puck.y + "px"
    }
}
const userObject = {
    radius: 15,
    isMoving: false

}
let user;
function createUser() {
    user = document.createElement("div");
    user.id = "user";

    user.style.width = '100px'
    user.style.height = '100px'
    user.style.backgroundColor = '#b30000'
    user.style.borderRadius = "50%";
    user.style.top = "350px";
    user.style.left = "150px";
    user.style.position = "absolute";
    //user.style.pointerEvents = "none";
    user.addEventListener("mousemove", userMove)

    const rink = document.getElementById("rink");
    rink.appendChild(user);

    function userMove(event) {

        userObject.isMoving = true;
        //console.log("over puck")

    }

}
function draw() {
    // console.log(userObject.isMoving)

    const rink = document.getElementById("rink").getBoundingClientRect();

    const maxX = rink.width - 120;
    const maxY = rink.height - 120;
    user.style.left = constrain(mouseX - 50, 0, maxX) + "px";
    user.style.top = constrain(mouseY - 50, 0, maxY) + "px";


    movePuck();
    window.requestAnimationFrame(draw);
}
function rinkMove(event) {
    const rink = document.getElementById("rink").getBoundingClientRect();
    // console.log(rink.x)
    mouseX = event.clientX - rink.x
    mouseY = event.clientY - rink.y
}