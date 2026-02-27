
const startButton = document.getElementById("play-button");
const titleScreen = document.getElementById("title");
let mouseX = 0
let mouseY = 0
let score = 0
let popUp = false
let scoreElement;
let popUpImg = null
function preload() {
    // preloads a image, kinda useless sense we do it anyways but just incase
    popUpImg = new Image();
    popUpImg.src = "Images/popup.png";
}


startButton.addEventListener("click", () => {
    startGame();
});

//making constrain function because my previous code to constrain thing burnt an image into my screen
function constrain(value, low, high) {
    return Math.min(Math.max(value, low), high);
}

function showPopUp() {
    // a check so nothing is messed up
    if (popUp !== true) return;
    // just a check to make sure everything is ready and the image is real
    if (!popUpImg) preload();
    //setting up this image,
    popUpImg.style.position = "absolute";
    popUpImg.style.top = "200px"; //locational stuff! took me abit to find the sweet spot
    popUpImg.style.left = "125px";
    popUpImg.style.zIndex = "100";

    //a click event to destroy the popup when the time comes
    popUpImg.addEventListener("click", () => {
        popUp = false;
        popUpImg.remove();
    });
    // makes a home for the image to be placed
    const rinkStuff = document.getElementById("rink");
    if (rinkStuff) rinkStuff.appendChild(popUpImg);
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
    createScore();

    // timer sets flag and immediately displays popup
    setInterval(() => {
        popUp = true;
        showPopUp();
    }, 10_000);
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
    y: 100,
    speedX: 4,
    speedY: 4,
    velocity: 3,
    width: 15,
    height: 15,
    radius: 10

};
let puckObject;

function createPuck() {
    puckObject = document.createElement("div");
    puckObject.id = "puck";

    puckObject.style.width = "15px"
    puckObject.style.height = "15px"
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
    const maxHeight = rink.clientHeight - puck.height;

    puck.x += puck.speedX;
    puck.y += puck.speedY;


    if (puck.x <= 0) {
        puck.x = 0;
        puck.speedX *= -1;
    }
    else if (puck.x >= maxWidth) {
        puck.x = maxWidth;
        puck.speedX *= -1;
    }


    if (puck.y <= 0) {
        puck.y = 0;
        puck.speedY *= -1;
    }
    else if (puck.y >= maxHeight) {
        puck.x = Math.random() * maxWidth;
        puck.y = 10
        score = 0;
        scoreElement.innerText = "Score: " + score;
    }
    if (puckObject) {
        puckObject.style.left = puck.x + "px";
        puckObject.style.top = puck.y + "px";
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
    user.style.height = '20px'
    user.style.backgroundColor = '#b30000'
    user.style.borderRadius = "10px";
    user.style.top = "350px";
    user.style.left = "150px";
    user.style.position = "absolute";
    user.style.pointerEvents = "none";
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
    // const maxY = rink.height - 120;
    user.style.left = constrain(mouseX - 50, 0, maxX) + "px";
    // user.style.top = constrain(mouseY - 50, 0, maxY) + "px";
    // puck.speedX *= 0.98;
    // puck.speedY *= 0.98;
    user.style.top = "600px"
    movePuck();
    collisions();




    window.requestAnimationFrame(draw);
}
function rinkMove(event) {
    const rink = document.getElementById("rink").getBoundingClientRect();
    // console.log(rink.x)
    if (popUp == false) {
        mouseX = event.clientX - rink.x
        mouseY = event.clientY - rink.y
    }

}

function collisions() { //https://youtu.be/_MyPLZSGS3s
    let uX = parseInt(user.style.left)
    let uY = parseInt(user.style.top)

    if (uX + 100 > puck.x && uX < puck.x + puck.width
        && uY + 20 > puck.y && uY < puck.y + puck.height
        && uY > puck.y) {
        puck.speedY *= -1;
        puck.y -= 5

        score += 1;
        scoreElement.innerText = "Score: " + score;
    }

    // to get the angle at which the puck makes contact and has to go we need the centers.

    // let userCenterX = parseInt(user.style.left) + 50;
    // let userCenterY = parseInt(user.style.top) + 10;
    // let puckCenterX = puck.x + (puck.width / 2);
    // let puckCenterY = puck.y + (puck.height / 2);


    //https://youtu.be/rtBCVe3j_24  

}
function createScore() {
    scoreElement = document.createElement("div");
    scoreElement.id = "score";
    scoreElement.innerText = "Score: " + score;
    const game = document.querySelector(".game-screen");
    document.body.appendChild(scoreElement);
}