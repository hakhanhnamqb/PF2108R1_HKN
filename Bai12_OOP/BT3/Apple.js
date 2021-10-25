class Apple {
    constructor(weight) {
        this.weight = weight;
    };
    decrease() {
        if (this.weight > 0)
            this.weight--;
    };
    isEmtpty() {
        if (this.weight > 0)
            return true;
        else
            return false;
    }
    getWeight() {
        return this.weight;
    }
}