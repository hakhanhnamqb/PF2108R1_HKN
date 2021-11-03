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
        /* for (let j = 0; j < balls.length; j++) {
          if (!(this === balls[j])) {
            const dx = this.x - balls[j].x;
            const dy = this.y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
    
            if (distance < this.size + balls[j].size) {
              balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
            }
          }
        } */
    };
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