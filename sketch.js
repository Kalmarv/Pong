let pongBall
let players = []

let settings = {
    ballSpeed: 10,
    ballSize: 25,
    paddleMargin: 30,
    paddleWidth: 20,
    paddleHeight: 125,
    paddleSpeed: 10
}

function setup() {
    createCanvas(w = 1280, h = 720);
    background(0);
    rectMode(CENTER)

    pongBall = new Ball(w / 2, h / 2)
    players[0] = new Paddle(0)
    players[1] = new Paddle(1)
}

function draw() {
    background(0)

    if (frameCount <= 1) pongBall.spawn()

    pongBall.update()
    pongBall.show()

    for (let i = 0; i < players.length; i++) {
        players[i].update()
        players[i].show()
    }

    controller(pongBall, players)
}

const controller = (_ball, _players) => {
    frameCount % 30 == 0 ? console.log(_ball.pos) : {}
}

class Ball {
    constructor(_x, _y) {
        this.pos = createVector(_x, _y)
    }

    spawn() {
        this.pos = createVector(w / 2, h / 2)
        this.vel = createVector(random() > 0.5 ? -settings.ballSpeed : settings.ballSpeed, random(-settings.ballSpeed, settings.ballSpeed))
    }

    update() {
        this.pos.add(this.vel)

        if (this.pos.y > h - settings.ballSize / 2) this.vel.y *= -1
        if (this.pos.y < 0 + settings.ballSize / 2) this.vel.y *= -1

        if (this.pos.x > w + settings.ballSize / 2 || this.pos.x < 0 - settings.ballSize / 2) this.spawn()
    }

    show() {
        fill(255)
        stroke(255)
        circle(this.pos.x, this.pos.y, settings.ballSize)
    }
}

class Paddle {
    constructor(_playerBool) {
        _playerBool == 0 ? this.player = 0 : this.player = 1
        this.y = h / 2
    }

    show() {
        if (this.player == 0) rect(settings.paddleMargin, this.y, settings.paddleWidth, settings.paddleHeight)
        if (this.player == 1) rect(w - settings.paddleMargin, this.y, settings.paddleWidth, settings.paddleHeight)
    }

    update() {
        if (keyIsDown(87) && this.y > 0 + settings.paddleHeight / 2) this.y -= settings.paddleSpeed
        if (keyIsDown(83) && this.y < h - settings.paddleHeight / 2) this.y += settings.paddleSpeed

    }
}