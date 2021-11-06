// setup canvas

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
let point = 0;
// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// define Ball constructor xác định hàm tạo bóng

class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  };
  //xác định phương pháp vẽ quả bóng
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  };
  //xác định phát hiện va chạm bóng
  collisionDetect() {
    let Ax = this.x;
    let Ay = this.y;
    if (this.x < bar.xBar)
      Ax = bar.xBar;
    else if (this.x > bar.xBar + bar.widthBar)
      Ax = bar.xBar + bar.widthBar;

    if (this.y < bar.yBar)
      Ay = bar.yBar;
    else if (this.y > bar.yBar)
      Ay = bar.yBar;
    let dx = this.x - Ax;
    let dy = this.y - Ay;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < this.size)
      return 1;
    else
      return 0;
  };
  mark() {
    if (this.collisionDetect()) {
      point++;
      disPoint.innerHTML = point;
    }
  }
  //xác định phương pháp cập nhật bóng
  update() {
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= bar.yBar) {
      if (this.collisionDetect())
        this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }
    this.x += this.velX;
    this.y += this.velY;
  };
  ballOver() {
    if (this.y + this.size >= width)
      return true;
  }

}
class Bar {
  constructor(widthBar, xBar, yBar, velBar) {
    this.widthBar = widthBar;
    this.xBar = xBar;
    this.yBar = yBar;
    this.velBar = velBar;
  };
  //xác định phương pháp vẽ thanh Bar
  drawBar() {
    ctx.beginPath();
    ctx.fillStyle = 'rgb(155,0,0)';
    ctx.fillRect(this.xBar, this.yBar, this.widthBar, 10);
    ctx.fill();

  };
  go_right() {
    if (this.xBar + this.widthBar < width) {
      this.xBar += this.velBar;
    }
  };
  go_left() {
    if (this.xBar > 0) {
      this.xBar -= this.velBar;
    }
  };
  clearRecLast() {
    ctx.clearRect(this.xBar, this.yBar, this.widthBar, 10);
  };
  getxBar() {
    return this.xBar;
  };
  getyBar() {
    return this.yBar;
  };
  getWidthBar() {
    return this.widthBar;
  }
}

// define array to store balls and populate it  //xác định mảng để lưu trữ các quả bóng và điền nó vào
let balls = [];

while (balls.length < 1) {
  const size = random(10, 20);
  let ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the adge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size * 2, size * 4),
    5,
    5,
    'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
    15   //size
  );
  balls.push(ball);
}

// define Bar
let bar = new Bar(200, (width / 2) - 100, height - 20, 100);
bar.drawBar();

// define loop that keeps drawing the scene constantly   /định nghĩa vòng lặp giúp vẽ cảnh liên tục
let disPoint = document.getElementById("point");
let pausegame = false;
function loop() {
  let gameOver = false;
  ctx.beginPath();
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    bar.drawBar();
    balls[i].update();
    if (balls[i].ballOver()) {
      gameOver = true;
    }
    balls[i].mark();
  }
  if (!gameOver || !pausegame)
    requestAnimationFrame(loop);
  else {
    if (confirm("Congratulations, you got " + point + " points." + " Do you want to play again?") == true) {
      gameOver = false;
      location.reload();
    }
  }
}
$(document).keydown(function (e) {
  if ((e.keyCode || e.which) == 37) // left arrow
  {
    bar.clearRecLast();
    bar.go_left();
  }
  else if ((e.keyCode || e.which) == 39)    // right arrow
  {
    bar.clearRecLast();
    bar.go_right();
  }
});
function start(){
  loop();
}
function pause(){
  pausegame = true;
}

