function getRandomInt(x) {
    return Math.floor(Math.random() * Math.floor(x));
}
// console.log(getRandomInt(4)) // returns an integer between 0 and 3

class Bots {
    constructor(name, time, stress, picture, positionX, positionY) {
        (this.name = name),
            (this.time = time),
            (this.stress = stress),
            (this.picture = picture), //some URL
            (this.positionX = positionX), //to determine
            (this.positionY = positionY); //to determine
    }
    move() {
        return `${this.name} has moved`
    }
    useTime(player) {}
    giveStress(player) {}
    displayPicture() {}
}

class ExLover extends Bots {
    constructor(name, time, stress, picture, positionX, positionY) {
        super(name, time, stress, picture, positionX, positionY);

        super.move();
    }
    talk() {
        var speech = "Heeeey! it's been a long time...";
        var speech1 = 'I think I made a mistake!';
        var speech2 = "I'm married. I have 2 kids and a dog now.";
        var speech3 = "I've changed you know.";
        var otherSpeech = [speech1, speech2, speech3];
        var delaySpeech = setTimeout(
            () => console.log(otherSpeech[getRandomInt(otherSpeech.length)]),
            4000
        );
        return speech, delaySpeech
    }
}

const exBoyfriend = new ExLover('Sam', -10, 10, './images/', 2, 3);
const exGirlfriend = new ExLover('Brandy', -10, 10, './images/', 2, 3);

console.log(exBoyfriend.talk())