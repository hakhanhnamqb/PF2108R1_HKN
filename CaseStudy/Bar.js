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
        if (this.xBar + 100 < width) {
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