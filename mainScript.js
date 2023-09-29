let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

function randomNumberForCreating(min, max) {
    return Math.floor(Math.random() * (max - min + 1))
}

let balls = []

function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

Ball.prototype.draw = function () {
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    context.fill();
}


Ball.prototype.update = function () {
    if (this.x + this.size >= width) {
        this.velX = -this.velX;
    }

    if (this.x - this.size <= 0) {
        this.velX = -this.velX;
    }

    if (this.y + this.size >= height) {
        this.velY = -this.velY;
    }

    if (this.y - this.size <= 0) {
        this.velY = -this.velY;
    }

    if (this.velY === 0) {
        this.velY = this.velY + 1
    }

    if (this.velX === 0) {
        this.velX = this.velX - 1
    }

    this.x += this.velX;
    this.y += this.velY;
};

Ball.prototype.collisionDetect = function () {
    for (let j = 0; j < balls.length; j++) {
        if (!(this === balls[j])) {
            let dx = this.x - balls[j].x;
            let dy = this.y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                balls[j].velX = balls[j].velX * -1;
                balls[j].velY = balls[j].velY * -1;
            }
        }
    }
};

function loop() {
    context.fillStyle = "rgba(0, 0, 0, 0.25)"
    context.fillRect(0, 0, width, height)

    while (balls.length < 40) {
        let ball = new Ball(
            randomNumberForCreating(0, width),
            randomNumberForCreating(0, height),
            randomNumberForCreating(-8, 8),
            randomNumberForCreating(-8, 8),
            "rgb(" + randomNumberForCreating(0, 255) + "," + randomNumberForCreating(0, 255) + "," + randomNumberForCreating(0, 255) + ")",
            randomNumberForCreating(10, 60)
        );
        balls.push(ball)
    }

    for (let ballsKey in balls) {
        balls[ballsKey].draw();
        balls[ballsKey].update();
        balls[ballsKey].collisionDetect();
    }

    requestAnimationFrame(loop)
}

loop()