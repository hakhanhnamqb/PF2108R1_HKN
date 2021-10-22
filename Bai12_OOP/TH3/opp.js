class Battery{
    constructor(){
        this.energy = 0;
    }
    setEnergy(energy){
        this.energy = energy;
    };
    getEnergy(){
        return this.energy;
    };
    decreaseEnergy(){
        if (this.energy>0){
            this.energy--;
        }
    }
};
class FlashLamp {
    constructor(){}
    setBattery(battery){
        this.battery = battery;
    };
    getBatteryInfo(){
        return this.battery.getEnergy();
    };
    light(){
        if (this.status){
            alert("Lighting");
        }
        else{
            alert("Not lighting");
        }
    };
    turnOn (){
        this.status = true;
    };
    turnOff (){
        this.status = false;
    }
};
let battery = new Battery();
battery.setEnergy(10);

let flashlamp = new FlashLamp();
flashlamp.setBattery(battery);

document.write("Battery info: " + flashlamp.getBatteryInfo() + "<br/>");
flashlamp.light();

document.write("Turn on<br/>");
flashlamp.turnOn();
flashlamp.light();
document.write("Battery info: " + flashlamp.getBatteryInfo() + "<br/>");

document.write("Turn off<br/>");
flashlamp.turnOff();
flashlamp.light();