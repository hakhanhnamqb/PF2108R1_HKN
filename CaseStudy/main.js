const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

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
    // ball position always drawn at least one ball width
    // away from the adge of the canvas, to avoid drawing errors
    random(0 + size, width- size),
    random(0 + size*2,size*4),
    5,
    5,
    'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
    15   //size
  );
  balls.push(ball);
}

// define Bar
let bar = new Bar(200, (width / 2) - 100, height - 20, 30);
bar.drawBar();

// define loop that keeps drawing the scene constantly   /định nghĩa vòng lặp giúp vẽ cảnh liên tục

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
    }
    if (!gameOver)
        requestAnimationFrame(loop);
    else {
        console.log("game over");
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

loop();