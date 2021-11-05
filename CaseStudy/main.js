// setup canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
// setup size of canvas
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
let point = 0;
let play = 1;
let alternate = true;
let sound = document.getElementById("audio");
// function to generate random number
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}
// define array to store balls and populate it  //xác định mảng để lưu trữ các quả bóng và điền nó vào
let balls = [];

while (balls.length < 1) {
  const size = random(10, 20);
  let ball = new Ball(
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
  if (gameOver) {
    clearInterval(play);
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
function start() {
  if (alternate) {
    sound.play();
    play = setInterval(loop, 15);
    alternate = false;
  }
}
function pause() {
  if (!alternate) {
    sound.pause();
    clearInterval(play);
    alternate = true;
  }
}
