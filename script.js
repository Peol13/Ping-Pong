const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 500;

const cw = canvas.width;
const ch = canvas.height;

const ballSize = 20;
let ballX = cw / 2 - ballSize / 2;
let ballY = ch / 2 - ballSize / 2;

const paddelHeight = 100;
const paddelWidth = 20;

const playerX = 70;
const aiX = 910;

let playerY = 200;
let aiY = 200;

const lineWidth = 6;
const lineHeight = 16;

let ballSpeedX = 1; 
let ballSpeedY = 1; 

function player() {
    ctx.fillStyle= '#7fff00';
    ctx.fillRect(playerX, playerY, paddelWidth, paddelHeight);  
}

function ai(){
    ctx.fillStyle= 'yellow';
    ctx.fillRect(aiX, aiY, paddelWidth, paddelHeight); 
}

function ball() {
ctx.fillStyle= '#ffffff';
ctx.fillRect(ballX, ballY, ballSize, ballSize);

ballX += ballSpeedX;
ballY += ballSpeedY;

// wykrycie kolizji piłki z liniami osi Y (poziomej)

if (ballY <= 0 || ballY + ballSize >= ch){
ballSpeedY = -ballSpeedY;
speedUp();
}
  // kiedy piłka wpada za paletkę gracza 
if (ballX <= 0){ //wygrał AI
    
  window.location.reload(true) 
}
  // gdy piłka wpada za paletką AI
if (ballX + ballSize >= cw){ //wygrał gracz
   
  window.location.reload(true) 
}
  //odbicie piłki od paletki gracza 
if ((ballX <= playerX + paddelWidth) && (ballY + ballSize / 2 >= playerY) && (ballY + ballSize / 2 <= playerY + paddelHeight)) {
    ballSpeedX = -ballSpeedX;
}
  //odbicie piłki od paletki AI
if ((ballX + ballSize >= aiX) && (ballY + ballSize / 2 >= aiY) && (ballY + ballSize / 2 <= aiY + paddelHeight)) {
    ballSpeedX = -ballSpeedX;
}
} 

function table(){
    //stół

    ctx.fillStyle = 'black'; // kolor rysowania 
    ctx.fillRect(0, 0, cw , ch); // zacznij rysować od 0=x 0=y , narysyj kwadrat o współrzędnych 1000=x i 500=y
    
    //linie na środku stołu (pola gry)

for (let i = 20; i < ch; i += 30){
    ctx.fillStyle = "gray"
    ctx.fillRect(cw / 2 - lineWidth / 2, i, lineWidth, lineHeight) 
   }
}
//odstęp od góry elementu canvas w pikselach 
topCanvas = canvas.offsetTop; 
function playerPosition(e) {
  //pozycja paletki jest równa pozycji myszy - (canvas.offsetTop) odstęp od góry przeglądarki do elementu canvas w pikselach - połowa wysokości paletki
playerY = e.clientY - topCanvas - paddelHeight / 2; 
//jeśli pozycja paletki >= wysokość canvas 500px (czyli dół) - wysokość paretki 100px
if (playerY >= ch - paddelHeight){ 
  // to pozycja paletki jest równa wysokość canvas 500px - wysokość paretki 100px. 
    playerY = ch - paddelHeight  
}
  // to samo ale gdy paletka dotyka górnej sciany canvas czyli punkt 0 px 
if (playerY <= 0) { 
    playerY = 0;
}
}
//Zwiększ prędkość piłki po odbiciu na osi X max 16px
function speedUp(){  
    //console.log(ballSpeedX + "," + ballSpeedY); 
    if (ballSpeedX > 0 && ballSpeedX < 16){
    ballSpeedX += 1;
    }
    else if (ballSpeedX < 0 && ballSpeedX < -16){
    ballSpeedX -= 1;
    }
    
}
//szczuczna inteligęcja 
function aiPosition(){

    const middlePaddel = aiY + paddelHeight/ 2;
    const middleBall = ballY + ballSize / 2;
    if (ballX > 500) { 
        if (middlePaddel - middleBall > 200) {
          aiY -= 20; 
        } else if (middlePaddel - middleBall > 50) {
          aiY -= 10;
        }
        else if (middlePaddel - middleBall < -200) {
          aiY += 20;
        } else if (middlePaddel - middleBall < -50) {
          aiY += 10;
        }
       }
      if (ballX <= 500 && ballX > 100) {
        if (middlePaddel - middleBall > 100) {
          aiY -= 3;
        } 
        else if (middlePaddel - middleBall < -100) {
          aiY += 3;
        }
      } 
        if (aiY >= ch - paddelHeight) {
         aiY = ch - paddelHeight
        }
      
        if (aiY <= 0) {
        aiY = 0;
      }
    }

canvas.addEventListener("mousemove",playerPosition)

function game() {
table()
ball()
player()
ai()
aiPosition()
}
setInterval(game, 1000 / 60)