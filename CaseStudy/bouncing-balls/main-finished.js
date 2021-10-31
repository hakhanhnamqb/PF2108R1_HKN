// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

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
    for (let j = 0; j < balls.length; j++) {
      if (!(this === balls[j])) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + balls[j].size) {
          balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
        }
      }
    }
  };
  //xác định phương pháp cập nhật bóng
  update() {
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  };
}
class Bar {
  constructor(widthBar, xBar, yBar) {
    this.widthBar = widthBar;
    this.xBar = xBar;
    this.yBar = yBar;
  };
  //xác định phương pháp vẽ thanh Bar
  drawBar() {
    ctx.beginPath();
    ctx.fillStyle = 'rgb(155,0,0)';
    ctx.fillRect(this.xBar, this.yBar, this.widthBar, 10);
    ctx.fill();

  };
  go_right() {
    if (this.xBar+100 < width){
      this.xBar+=10;
    }
  };
  go_left() {
    if (this.xBar > 0 ){
      this.xBar-=10;
    }
  }
}

// define ball draw method, xác định phương pháp vẽ quả bóng
/* Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}; */

// define ball update method  /xác định phương pháp cập nhật bóng

/* Ball.prototype.update = function () {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}; */

// define ball collision detection //xác định phát hiện va chạm bóng

/* Ball.prototype.collisionDetect = function () {
  for (let j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
      }
    }
  }
}; */

// define array to store balls and populate it  //xác định mảng để lưu trữ các quả bóng và điền nó vào

let balls = [];

while (balls.length < 1) {
  const size = random(10, 20);
  let ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the adge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    5,
    5,
    'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
    15   //size
  );
  balls.push(ball);
}

// define Bar
let bar = new Bar(100, (width / 2) + 10, height - 20);

// define loop that keeps drawing the scene constantly   /định nghĩa vòng lặp giúp vẽ cảnh liên tục

function loop() {
  ctx.beginPath();
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0, 0, width, height);
  
  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    bar.drawBar();
    balls[i].update();
    balls[i].collisionDetect();

  }

  requestAnimationFrame(loop);
  $(document).keydown(function (e) {
    if ((e.keyCode || e.which) == 37) // left arrow
    {
      bar.go_left();
    }
    else if ((e.keyCode || e.which) == 39)    // right arrow
    {
      bar.go_right();
    }
  });
}

loop();