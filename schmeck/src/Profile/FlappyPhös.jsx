import React, { Component } from 'react';
import imgSrc1 from './img1.jpg'
import imgSrc2 from './img2.jpg'


var img1 = new Image()
var img2 = new Image()

img1.src = imgSrc1
img2.src = imgSrc2

class FlappyPhös extends Component {
    state = {}

    constructor() {
        super()
        this.size = 30
        this.g = 0.3
        this.playing = false;
        this.gameWidth = 350;
        this.gameHeight = 500;
        this.gameObjects = [];
        this.spawnObstruct();

        this.score = 0;
        //player
        this.player = new Player(this.gameWidth / 2.5, this.gameHeight / 2, this.size, this.g, this)

        this.nextSpavn = 0;
        this.spavnTime = 250;
    }

    spawnObstruct = () => {
        this.gameObjects.push(new Obstruct(this.gameWidth, 1.5, this, this.gameHeight));
    }

    updat = (c) => {
        c.font = "200px Arial";
        c.fillStyle = "rgb(255,255,255,1)";
        c.fillText(this.score, (this.gameWidth / 2) - 50, this.gameHeight / 2 + 50);
        if (this.spavnTime <= this.nextSpavn) {
            this.nextSpavn = 0;
            this.spawnObstruct();
        }

        this.player.draw(c)
        if (this.playing) {
            this.player.updat();
            this.nextSpavn++;
        }
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].draw(c);
            if (this.playing) {
                this.gameObjects[i].updat();
            }
        }
    }

    gameOver = () => {
        this.playing = false;
        this.props.gameOver(this.score)
    }

    click = (vel) => {
        console.log("jump")
        if (this.playing === false) {
            this.playing = true;
        }
        this.player.flapp(vel);
    }

    componentDidMount() {

        this.canvas = document.getElementById('TheCanvas');
        this.c = this.canvas.getContext('2d');

        this.canvas.width = this.gameWidth;
        this.canvas.height = this.gameHeight;
        this.animate();
    }


    render() {

        return (
            <div>
                <button onMouseDown={() => this.click(8)} style={{ background: 'none', border: 'none' }}>
                    <canvas id="TheCanvas"></canvas>
                </button>
            </div>
        );
    }


    animate = () => {
        console.log(":)")
        requestAnimationFrame(this.animate);
        this.c.clearRect(0, 0, this.gameWidth, this.gameHeight);
        this.updat(this.c);
    }

}




class Player {
    constructor(x, y, size, g, game) {
        this.x = x;
        this.y = y;
        this.g = g;
        this.size = size;
        this.velY = 0;
        this.game = game;
    }

    draw(c) {
        c.fillStyle = this.col;
        if (this.velY > 0) {
            c.drawImage(img2, this.x, this.y, this.size, this.size);
        } else {
            c.drawImage(img1, this.x, this.y, this.size, this.size);
        }
        this.img = img2;
    }

    updat() {
        this.velY += this.g;
        if (this.velY >= 8) {
            this.velY = 8
        }
        this.y += this.velY;

        if (this.y < 0 || this.y > this.gameHeight - this.size) {
            this.game.gameOver();
        }

        for (let i = 0; i < this.game.gameObjects.length; i++) {
            if (isOverlapping(this.x, this.size, this.game.gameObjects[i].x, this.game.gameObjects[i].w)) {
                if (this.y > this.game.gameObjects[i].p + this.game.gameObjects[i].hh - this.size || this.y < this.game.gameObjects[i].p) {
                    this.game.gameOver()
                }
                break;
            }
            if (this.game.gameObjects[i].x < this.x)
                this.game.gameObjects[i].scorePast();
        }
    }

    flapp(vel) {
        this.velY = -vel;
    }
}

function isOverlapping(x1, w1, x2, w2) {
    if ((x1 > x2 && x1 < x2 + w2) || (x1 + w1 > x2 && x1 + w1 < x2 + w2) || (x1 < x2 && x1 + w1 > x2 + w2)) {
        return true;
    }
    return false;
}

class Obstruct {
    constructor(x, vel, game, gameHeight) {
        this.past = false;
        this.x = x;
        this.vel = vel;
        this.hh = 150;
        this.w = 30;
        this.p = Math.random() * (gameHeight - (this.hh + 10)) + 5;
        this.game = game
        this.gameHeight = gameHeight;
    }

    scorePast() {
        if (this.past === false) {
            this.past = true;
            this.game.score += 1;
        }
    }

    draw(c) {
        c.fillStyle = "rgb(0,255,0,1)";
        c.fillRect(this.x, 0, this.w, this.p);
        c.fillRect(this.x, this.p + this.hh, this.w, this.gameHeight - (this.p + this.hh));
    }

    updat() {
        this.x -= this.vel;

        if (this.x < 0 - this.w) {
            this.game.gameObjects.splice(0, 1);
        }
    }
}


export default FlappyPhös;