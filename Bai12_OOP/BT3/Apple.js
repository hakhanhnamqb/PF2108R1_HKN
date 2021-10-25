class Apple {
    constructor(weight) {
        this.weight = weight;
    };
    decrease() {
        if (this.weight > 0)
            this.weight--;
    };
    getWeight() {
        return this.weight;
    }
}