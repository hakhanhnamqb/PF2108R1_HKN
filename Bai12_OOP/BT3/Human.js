class Human {
    constructor(name,weight) {
        this.name = name;
        this.weight = weight;
    };
    getSex(sex) {
        if (this.name == "Adam")
            this.sex = true;
        else
            this.sex = false;
    };
    /* setWeight(weight){
        this.weight = weight;
    } */
}