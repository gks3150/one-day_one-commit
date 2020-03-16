const para = document.querySelector('p');
let count = 0;

// setup canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number
function random(min,max) {
    const num = Math.floor(Math.random()*(max-min)) + min;
    return num;
}
// 볼의 모양에 대한 class
class Shape{
    constructor(x, y, velX, velY, exists){
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.exists = exists;
    }
}
// make Ball class
class Ball extends Shape{
    constructor(x, y, velX, velY, exists, color, size){
        super(x, y, velX, velY, exists);
        this.color = color;
        this.size = size;
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
        ctx.fill();
    }
    update(){
        if((this.x + this.size) >= width){
            this.velX = -(this.velX);
        }
        if((this.x - this.size) <= 0){
            this.velX = -(this.velX);
        }
        if((this.y + this.size) >= height){
            this.velY = -(this.velY);
        }
        if((this.y - this.size) <= 0){
            this.velY = -(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY;
    }
    collisionDetect(){
        for(let j=0; j<balls.length; j++){
            if(!(this === balls[j])){
                const dx = this.x - balls[j].x;
                const dy = this.y - balls[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if(distance < this.size + balls[j].size && balls[j].exists){
                    balls[j].color = this.color = 'rgb('+ random(0,255) + ',' + random(0,255) + ',' + random(0,255) + ')';
                    balls[j].velX = random(-7,7);
                    balls[j].velY = random(-7,7);
                }
            }
        }
    }
}
/* JS에 class 개념이 나오기 전에 사용된 방법
function Ball(x, y, velX, velY, color, size){
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;

    Ball.prototype.draw = function() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }
} */

// Ball을 상속받는 EvilBall 만들기
class EvilBall extends Ball{
    constructor(x, y, velX, velY, exists, color, size){
        super(x, y, velX, velY, exists);
        this.color = 'white';
        this.size = 30;
    }
    // Boundary를 넘어서는지 체크하기 위한 함수
    checkBounds(){
        if((this.x + this.size) >= width) {
            this.x -= this.size;
        }
        
        if((this.x - this.size) <= 0) {
            this.x += this.size;
        }
        
        if((this.y + this.size) >= height) {
            this.y -= this.size;
        }
        
        if((this.y - this.size) <= 0) {
            this.y += this.size;
        }
    }
    //EvilBall의 움직임을 표현하기 위한 함수
    setControls(){
        var _this = this;
        window.onkeydown = function(e){
            if(e.key === 'a'){
                _this.x -= _this.velX;
            } else if(e.key === 'd'){
                _this.x += _this.velX;
            } else if(e.key === 'w'){
                _this.y -= _this.velY;
            } else if(e.key === 's'){
                _this.y += _this.velY;
            }
        };
    };
    //다른 Ball과 충돌을 감지하기 위한 함수
    collisionDetect(){
        for (let j=0; j<balls.length; j++){
            if(balls[j].exists){
                const dx = this.x - balls[j].x;
                const dy = this.y - balls[j].y;
                const distance = Math.sqrt(dx*dx+dy*dy);
                
                if(distance < this.size + balls[j].size){
                    balls[j].exists = false;
                    count--;
                    para.textContent = 'Ball Count: ' + count;
                }
            }
        }
    };
}

// main
const balls = [];
while(balls.length < 25){
    let size = random(10,20);
    let ball = new Ball(random(0+size, width-size), random(0+size, height-size), random(-7,7), random(-7,7),true, 'rgb('+ random(0,255) + ',' + random(0,255) + ',' + random(0,255) + ')',size);
    balls.push(ball);
    count++;
    para.textContent = 'Ball Count: ' + count;
}

let evil = new EvilBall(random(0,width), random(0,height), 7, 7, true);
evil.setControls();

// inside canvas logic
function loop() {
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0,0, width, height);
    
    for (let i=0; i< balls.length; i++){
        if(balls[i].exists){
            balls[i].draw();
            balls[i].update();
            balls[i].collisionDetect();
        }
    }
    evil.draw();
    evil.checkBounds();
    evil.collisionDetect();
    gameOver();
    requestAnimationFrame(loop);
}

function gameOver(){
    if(count === 0){
        var h1 = document.querySelector('h1');
        h1.textContent = "Game - Over"
        h1.style.fontSize = "100px";
        h1.style.top = "50%";
        h1.style.left = "50%";
        h1.style.right = "0";
        h1.style.transform = "translateX(-50%)";
    }
}

loop();