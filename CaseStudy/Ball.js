class Ball {
    constructor(x, y, velX, velY, color, radius) {
      this.x = x;
      this.y = y;
      this.velX = velX;
      this.velY = velY;
      this.color = color;
      this.radius = radius;
    };
    //xác định phương pháp vẽ quả bóng
    draw() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
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
      if (distance < this.radius)
        return 1;
      else
        return 0;
    };
    mark() {
      if (this.collisionDetect()) {
        point++;
        disPoint.innerHTML = point;
        ball_vel++;
        console.log(ball_vel);
      }
    }
    //xác định phương pháp cập nhật bóng
    update() {
      if ((this.x + this.radius) >= width) {
        this.velX = -(this.velX);
      }
  
      if ((this.x - this.radius) <= 0) {
        this.velX = -(this.velX);
      }
  
      if ((this.y + this.radius) >= bar.yBar) {
        if (this.collisionDetect())
          this.velY = -(this.velY);
      }
  
      if ((this.y - this.radius) <= 0) {
        this.velY = -(this.velY);
      }
      this.x += this.velX;
      this.y += this.velY;
    };
    ballOver() {
      if (this.y + this.radius >= width)
        return true;
    }
  
  }