// set up parameters
let ball_radius = 15;
let ball_vel = 5;
let widthBar = 200;
let velBar = 100;

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
//sound.play();
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
    ball_vel,
    ball_vel,
    'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
    ball_radius   //radius
  );
  balls.push(ball);
}

// define Bar
let bar = new Bar(widthBar, (width / 2) - widthBar / 2, height - 20, velBar);
bar.drawBar();

// define loop that keeps drawing the scene constantly   /định nghĩa vòng lặp giúp vẽ cảnh liên tục
let disPoint = document.getElementById("point");
function loop() {
  let gameOver = false;
  ctx.beginPath();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.548)';
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
    if(point>10){
      clearInterval(play);
      if (confirm("Quá xuất sắc, " + point + " điểm." + " Bạn có muốn chơi lại?") == true) {
        gameOver = false;
        location.reload();
      }
    }
    else if(point>=2){
      clearInterval(play);
      if (confirm("Tuyệt vời, ban đạt " + point + " điểm." + " Bạn có muốn chơi lại?") == true) {
        gameOver = false;
        location.reload();
      }
    }
    else{
      clearInterval(play);
      if (confirm("Chia buồn, bạn đã đạt " + point + " điểm." + " Bạn có muốn chơi lại?") == true) {
        gameOver = false;
        location.reload();
      }
    }
  }
  if (point >= 3) {
    
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
