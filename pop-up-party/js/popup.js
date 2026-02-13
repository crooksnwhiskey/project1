

const startButton = document.getElementById("play-button");
const titleScreen = document.getElementById("title");
let mouseX = 0
let mouseY = 0

startButton.addEventListener("click", () => {
    startGame();
});

function startGame() {
    const title = document.querySelector(".title-screen");
    const game = document.querySelector(".game-screen");
    title.style.display = "none";
    game.style.display = "block";
    window.requestAnimationFrame(draw)

    createRink()
    createPuck()
    createUser()
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
    puck.style.position = "absolute"


    const rink = document.getElementById("rink");
    rink.appendChild(puck);
    rink.addEventListener("mousemove", rinkMove)
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
    //!(parseInt(user.style.left) < 0) ||
    if (!((parseInt(user.style.left)) > (rink.width - 100)) && !(parseInt(user.style.left) < 0)) {
        if (userObject.isMoving === true) {
            user.style.left = (mouseX - 50) + "px"
        }

    }
    else if (parseInt(user.style.left) < 0) {
        user.style.left = 0 + "px"
    }
    else {
        user.style.left = rink.width - 120 + "px"

    }
    if (!((parseInt(user.style.top)) > (rink.height - 100)) && !(parseInt(user.style.top) < 0)) {
        if (userObject.isMoving === true) {
            user.style.top = (mouseY - 30) + "px"
        }

    }
    else if (parseInt(user.style.top) < 0) {
        user.style.top = 0 + "px"
    }
    else {
        user.style.top = rink.height - 110 + "px"

    }

    window.requestAnimationFrame(draw)
}
function rinkMove(event) {
    const rink = document.getElementById("rink").getBoundingClientRect();
    // console.log(rink.x)
    mouseX = event.clientX - rink.x
    mouseY = event.clientY - rink.y
}