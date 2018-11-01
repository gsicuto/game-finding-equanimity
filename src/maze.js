/* eslint-disable func-names */
// My context

const ctx = document.getElementById('canvas').getContext('2d');

// Key listener function

// Global listeners and variables

const walls = [];
const freeEspace = [];
let frame = 0;
const rainAudio = document.createElement('AUDIO');
rainAudio.src = 'assets/sounds/Sound Effect - Rain  Thunder.wav';
const stepAudio = document.createElement('AUDIO');
stepAudio.src = 'assets/sounds/footstep.wav';
const nimityFound = document.createElement('AUDIO');
nimityFound.src = 'assets/sounds/Nimity_pru.wav';
const equaFound = document.createElement('AUDIO');
equaFound.src = 'assets/sounds/Equa_crying.wav';

// Constructor Maze

function Maze() {
  this.sizeX = 100;
  this.sizeY = 100;
  this.backGround = new Image();
  this.backGround.src = 'assets/Img/backGround.png';
}

Maze.prototype.draw = function () {
  const pattern = ctx.createPattern(this.backGround, 'repeat');
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, 1200, 600);
};

Maze.prototype.drawMaze = function () {
  walls.forEach((wall) => {
    ctx.fillStyle = 'black';
    ctx.fillRect(wall.posX, wall.posY, 20, 20);
  });
};

Maze.prototype.drawDarkness = function (argHero) {
  // ctx.globalCompositeOperation = "multiply";
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  ctx.fillRect(0, 0, 1200, 600);

  const gradient = ctx.createRadialGradient(argHero.posX + 10, argHero.posY + 10, 0, argHero.posX + 10, argHero.posY, 100);
  gradient.addColorStop(0, 'rgba(247, 247, 247, 0)');
  gradient.addColorStop(0.25, 'rgba(247, 247, 247, 0.4)');
  gradient.addColorStop(0.5, 'rgba(247, 247, 247, 0.6)');
  gradient.addColorStop(0.75, 'rgba(247, 247, 247, 0.8)');
  gradient.addColorStop(1, 'rgba(247, 247, 247, 1)');
  ctx.beginPath();
  // ctx.globalCompositeOperation = 'destination-out';
  ctx.arc(argHero.posX + 10, argHero.posY + 10, 40, 0, 2 * Math.PI);
  ctx.fillStyle = gradient;
  ctx.fill();
  // ctx.globalCompositeOperation = "source-over";
  ctx.closePath();
};

Maze.prototype.CreateMaze = function () {
  const map = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

  function drawTile(x, y) {
    walls.push({
      posX: x * 20,
      posY: y * 20,
    });
  }
  map.forEach((row, i) => {
    row.forEach((tile, j) => {
      if (tile === 1) {
        drawTile(j, i);
      } else {
        freeEspace.push({
          posX: j * 20,
          posY: i * 20,
        });
      }
    });
  });
};

// Constructor Hero

function Hero(argName) {
  this.name = argName;
  this.ligthSize = 60;
  this.posX = 30;
  this.posY = 30;
  this.imgPosX = 0;
  this.imgPosY = 0;
  this.imgGuySizeW = 64;
  this.imgGuiSizeH = 96;
  this.frameCountW = 4;
  this.frameCountH = 4;
  this.frameSizeW = this.imgGuySizeW / this.frameCountW;
  this.frameSizeH = this.imgGuiSizeH / this.frameCountH;
  this.itens = [];
  this.equa = false;
  this.score = 100000;
  this.nimity = false;
  this.heroImg = new Image();
  this.heroImg.src = 'assets/Img/guy.png';
}


Hero.prototype.Draw = function () {
  ctx.fillStyle = 'red';
  ctx.drawImage(this.heroImg, this.imgPosX, this.imgPosY, this.frameSizeW, this.frameSizeH, this.posX, this.posY, 19.2, 28.8);
};

Hero.prototype.drawLight = function () {
  const gradient = ctx.createRadialGradient(this.posX + 10, this.posY + 10, 0, this.posX + 10, this.posY, 100);
  gradient.addColorStop(0, 'rgba(247, 247, 247, 0)');
  gradient.addColorStop(0.25, 'rgba(247, 247, 247, 0.4)');
  gradient.addColorStop(0.5, 'rgba(247, 247, 247, 0.6)');
  gradient.addColorStop(0.75, 'rgba(247, 247, 247, 0.8)');
  gradient.addColorStop(1, 'rgba(247, 247, 247, 1)');
  ctx.beginPath();
  ctx.arc(this.posX + 10, this.posY + 10, 40, 0, 2 * Math.PI);
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.closePath();
};

// eslint-disable-next-line func-names
Hero.prototype.moveRight = function () {
  this.posX += 10;
  this.imgPosY = 24;
  this.imgPosX = (frame % this.frameCountW) * this.frameSizeW;
  if (this.detectColision()) this.posX -= 10;
};
// eslint-disable-next-line func-names
Hero.prototype.moveLeft = function () {
  this.posX -= 10;
  this.imgPosY = 48;
  this.imgPosX = (frame % this.frameCountW) * this.frameSizeW;
  if (this.detectColision()) this.posX += 10;
};
Hero.prototype.moveUp = function () {
  this.posY -= 10;
  this.imgPosY = 72;
  this.imgPosX = (frame % this.frameCountW) * this.frameSizeW;
  if (this.detectColision()) this.posY += 10;
};
Hero.prototype.moveDown = function () {
  this.posY += 10;
  this.imgPosY = 0;
  this.imgPosX = (frame % this.frameCountW) * this.frameSizeW;
  if (this.detectColision()) this.posY -= 10;
};
Hero.prototype.move = function (hero, e) {
  switch (e.keyCode) {
    case 37:
    this.moveLeft();
      break;

    case 39:
      this.moveRight();
      break;

    case 38:
      this.moveUp();
      break;

    case 40:
      this.moveDown();
      break;
    default:
  }
};

Hero.prototype.detectColision = function () {
  for (let i = 0; i < walls.length; i += 1) {
    if (this.posX < walls[i].posX + 20
      && this.posX + 20 > walls[i].posX
      && this.posY < walls[i].posY + 20
      && 20 + this.posY > walls[i].posY) {
      return true;
    }
  }
  return false;
};

// eslint-disable-next-line func-names
Hero.prototype.detectEquaNimity = function (argEqua, argNimity) {
  if (this.posX < argEqua.posX + 20
    && this.posX + 20 > argEqua.posX
    && this.posY < argEqua.posY + 20
    && 20 + this.posY > argEqua.posY) {
    this.equa = true;
    this.score += this.score;
    equaFound.load();
    equaFound.play();
    argEqua.posX = 0;
    argEqua.posY = 0;
  }
  if (this.posX < argNimity.posX + 20
    && this.posX + 20 > argNimity.posX
    && this.posY < argNimity.posY + 20
    && 20 + this.posY > argNimity.posY) {
    this.nimity = true;
    this.score += this.score;
    nimityFound.load();
    nimityFound.play();
    argNimity.posX = 0;
    argNimity.posY = 0;
  }
};

// Constructor of Evil

function Evil() {
  this.name = 'Evil';
  this.ligthSize = 60;
  this.posX = 0;
  this.posY = 0;
  this.itens = [];
  this.equa = false;
  this.nimity = false;
  this.evilImg = new Image();
}
Evil.prototype.draw = function () {
  ctx.fillStyle = 'black';
  ctx.fillRect(this.posX, this.posY, 20, 20);
};

Evil.prototype.randomPosition = function () {
  const arrPos = Math.floor(Math.random() * freeEspace.length);
  this.posX = freeEspace[arrPos].posX;
  this.posY = freeEspace[arrPos].posY;
};

// Constructor of Equa

function Equa() {
  this.posX = Math.floor(Math.random() * (79) * 10);
  this.posY = Math.floor(Math.random() * (59) * 10);
  this.equaImg = new Image();
  this.equaImg.src = 'assets/Img/Equa.png';
  this.sound;
}
Equa.prototype.randomPosition = function () {
  const arrPos = Math.floor(Math.random() * freeEspace.length);
  this.posX = freeEspace[arrPos].posX;
  this.posY = freeEspace[arrPos].posY;
};
Equa.prototype.draw = function (argHero) {
  if (!argHero.equa) {
    ctx.drawImage(this.equaImg, 288, 192, 32, 48, this.posX, this.posY, 19.2, 28.8);
  }
};

// Construtor Nimity

function Nimity() {
  this.posX = Math.floor(Math.random() * (79) * 10);
  this.posY = Math.floor(Math.random() * (59) * 10);
  this.nimityImg = new Image();
  this.nimityImg.src = 'assets/Img/nimity.png';
  this.sound;
}
Nimity.prototype.randomPosition = function () {
  const arrPos = Math.floor(Math.random() * freeEspace.length);
  this.posX = freeEspace[arrPos].posX;
  this.posY = freeEspace[arrPos].posY;
};

Nimity.prototype.draw = function (argHero) {
  // ctx.globalCompositeOperation = 'source-over';
  if (!argHero.nimity) {

    ctx.drawImage(this.nimityImg, 0, 0, 38.333, 36.25, this.posX, this.posY, 38.333, 36.25);
    // ctx.fillStyle = 'blue';
    // ctx.fillRect(this.posX, this.posY, 20, 20);
  }
};

let myMaze;
let myHero;
let myHero2;
let myEqua;
let myNimity;
// let myEvil;
let player = 1;

function showWinner() {
  let winner;
  if (myHero.score > myHero2.score) winner = myHero;
  if (myHero2.score > myHero.score) winner = myHero2;
  ctx.fillStyle = 'red';
  ctx.font = '48px serif';
  ctx.clearRect(0, 0, 800, 600);
  ctx.fillText(`${winner.name} win with ${winner.score} score`, 50, 50);
}

function endGame(argHero, argGame) {
  if (argHero.equa && argHero.nimity) {
    // argHero.score += (40000 - frame);
    if (player === 1) document.getElementById('score1').innerHTML = argHero.score;
    if (player === 2) document.getElementById('score2').innerHTML = argHero.score;
    alert(`${argHero.name} you finish the game`);
    player += 1;
    rainAudio.pause();
    stepAudio.pause();
    window.cancelAnimationFrame(argGame);
    if (player === 3) showWinner();
  }
}

function engine(argumentHero) {
  frame += 1;
  if (frame % 60 === 0) argumentHero.score -= 10;
  const game = window.requestAnimationFrame(() => {
    engine(argumentHero);
  });
  ctx.clearRect(0, 0, 800, 600);
  myMaze.draw();
  myMaze.drawMaze();
  myEqua.draw(argumentHero);
  myNimity.draw(argumentHero);
  argumentHero.Draw();
  // myHero.drawLight();
  // ctx.globalCompositionOperation = 'source-over';
  // myEvil.draw();
  // myMaze.drawDarkness(myHero);
  // ctx.translate(myHero.posX, myHero.posY);
  argumentHero.detectEquaNimity(myEqua, myNimity);
  if (player === 1) document.getElementById('score1').innerHTML = argumentHero.score;
  if (player === 2) document.getElementById('score2').innerHTML = argumentHero.score;
  endGame(argumentHero, game);
}

function start() {
  rainAudio.load();
  rainAudio.play();
  if (player === 1) {
    myHero = new Hero();
    myHero.name = 'Player 1';
    window.addEventListener('keydown', (e) => {
      myHero.move(myHero, e);
      stepAudio.load();
      stepAudio.play();
      setInterval(stepAudio.pause, 50);
    }, false);
    myMaze = new Maze();
    myEqua = new Equa();
    // myEvil = new Evil();
    myNimity = new Nimity();
    myMaze.CreateMaze();
    myEqua.randomPosition();
    myNimity.randomPosition();
    // myEvil.randomPosition();
    // setInterval(engine, 10);
    engine(myHero);
  }
  if (player === 2) {
    myHero2 = new Hero();
    myHero2.name = 'Player 2';
    window.addEventListener('keydown', (e) => {
      myHero2.move(myHero2, e);
    }, false);
    myMaze = new Maze();
    myEqua = new Equa();
    // myEvil = new Evil();
    myNimity = new Nimity();
    myMaze.CreateMaze();
    myEqua.randomPosition();
    myNimity.randomPosition();
    // myEvil.randomPosition();
    // setInterval(engine, 10);
    engine(myHero2);
  }
}

document.getElementById('start').onclick = function () {
  start();
};
