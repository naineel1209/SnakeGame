// Javascript Variables and Constants
let speed = 10; //every 1/speed screen will be loaded
let lastPaintTime = 0;
const scoreBoard = document.querySelector('#score');
const highScoreBoard = document.querySelector('#high-score');

//as we are in computer screens x -> columns, y -> rows
const board = document.querySelector('#board')
let snakeArr = [
    {x: 10, y: 7}
];

let foodArr = {
    x: 3,
    y: 15
};

let inputDir = {
    x: 0,
    y: 0
} //initially at 0,0 place

let score = 0;

// Game Functions//

function isCollides(snakes) {
    const [first] = snakes;
    const snakeHead = {...first};

    //If Snake Head bump into the Wall
    if(snakeHead.x >= 18 || snakeHead.x <= 0  || snakeHead.y >= 18|| snakeHead.y <= 0)
        return true;
    
    //If Snake Head bump into himself
    for(let i = 1; i < snakes.length; i++){
        if(snakes[i].x === snakeHead.x && snakes[i].y === snakeHead.y){
            return true;
        }
    }

    return false;
}

function gameEngine() {
    //1. Check if Snake Collapsed
    if(isCollides(snakeArr)){
        inputDir = {x:0 , y:0};
        
        alert("Sambhal Ke Khelo Bhai")
        
        score = 0;
        highScore = Math.max(highScore, score);
        snakeArr = [{x: 10, y: 10}];
        scoreBoard.innerHTML = `</b>Score: </b> ${score}`

    }

    //2. If Snake Ate Food
    if(snakeArr[0].y === foodArr.y && snakeArr[0].x === foodArr.x)
    {
        console.log("hello friend")
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});

        //Formula to generate Random Numbers in an interval
        // Math.round(a + (b-a)* Math.random())
        let a = 2, b = 16;
        foodArr = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())};

        //Updating scores
        score++;
        scoreBoard.innerHTML = `</b>Score: </b> ${score}`
        console.log(highScore)
        if(score > hiScoreVal){
            hiScoreVal = score;
            localStorage.setItem("highScore", JSON.stringify(hiScoreVal));
            highScoreBoard.innerHTML = `High Score: ${hiScoreVal}`;
        }
    }

    //3. Move Snake ahead
    //Snake can be moved if we just place the last element to its next element creating a chain
    for(let index = snakeArr.length-1; index>=1; index--){
        //place the last element at its predecessor
        snakeArr[index] = {...snakeArr[index-1]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //4. Display Snake
    board.innerHTML = "";
    snakeArr.forEach((snake, index) => {
        const div = document.createElement('div')

        //grid row/co start places in
        div.style.gridRowStart = snake.y;
        div.style.gridColumnStart = snake.x;

        if(index === 0){
            div.classList.add("snake-head");
        }else{
            div.classList.add("snake-body");
        }

        board.append(div);
    })

    //5. Display the Food
    const foodElem = document.createElement('div');
    foodElem.style.gridRowStart = foodArr.y;
    foodElem.style.gridColumnStart = foodArr.x;
    foodElem.classList.add("food")
    board.append(foodElem);

}

//main function loads the screen
function main(currentTime) {
    window.requestAnimationFrame(main);

    //if time interval is small then we will skip this call
    if((currentTime - lastPaintTime) / 1000 < 1 / speed){
        return;
    }

    lastPaintTime = currentTime;
    gameEngine();
}

//Main Logic Starts here
let highScore = localStorage.getItem("highScore");
let hiScoreVal;

if(highScore === null){
    hiScoreVal = 0;
    localStorage.setItem("highScore", JSON.stringify(hiScoreVal));
}else{
    hiScoreVal = JSON.parse(highScore)
    highScoreBoard.innerHTML = `High Score: ${hiScoreVal}`
}


window.requestAnimationFrame(main)
window.addEventListener('keydown', (e) => {
  inputDir = {x: 0, y: 1};

  switch(e.code){
      case "ArrowUp":
          console.log("Up!")
          inputDir.x = 0;
          inputDir.y = -1;
          break;

      case "ArrowDown":
          console.log("Down!")
          inputDir.x = 0;
          inputDir.y = 1;
          break;

      case "ArrowLeft":
          console.log("Left!")
          inputDir.x = -1;
          inputDir.y = 0;
          break;

      case "ArrowRight":
          console.log("Right!")
          inputDir.x = 1;
          inputDir.y = 0;
          break;

      default:
          break;
  }
});
