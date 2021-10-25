class Human {
    constructor(name, sex, weight) {
        this.name = name;
        this.sex = sex;
        this.weight = weight;
    };
    setGender(sex) {
        if (this.name == "Adam")
            this.sex = true;
        else
            this.sex = false;
    };
    getName(){
        return this.name;
    };
    setName(name){
        this.name = name;
    };
    getWeight(){
        return this.weight;
    }
    setWeight(weight){
        this.weight = weight;
    }
    eat(apple){
        this.apple.decrease();
        if (apple.getWeight>0)
        this.weight++;
    };
    say(){
        console.log(this.name + " đã ăn một miếng táo <br/>");
    }

}