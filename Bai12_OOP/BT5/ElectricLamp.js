class ElectricLamp {
    constructor(status) {
        this.status = false;
    };
    turnOn(status){
        this.status = true;
    };
    turnOff(status){
        this.status = false;
    }
}