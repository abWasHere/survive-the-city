import { getRandomInt } from "./randomInteger.js";
import { player } from "./playerAndChrono.js";
import { canvas } from "./canvas.js";

const botPic = document.getElementById("picture-bot");
const botSpeech = document.getElementById("bot-speech");
const playerName = document.getElementById("landing-player-name");

class Bots {
	constructor(x, y, dx, dy) {
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.pictures = [
			"https://img.icons8.com/ios-filled/50/000000/decision.png",
		];
	}

	updatePosition() {
		// change direction when bot touch the limits of the canvas
		if (this.x + this.dx > canvas.width || this.x + this.dx < 0) {
			this.dx = -this.dx; // sur l'axe des x
		}
		if (this.y + this.dy > canvas.height || this.y + this.dy < 0) {
			this.dy = -this.dy; // sur l'axe des y
		}
		// move the bot
		this.x += this.dx;
		this.y += this.dy;
	}

	changePicture() {
		var randomPic = this.pictures[getRandomInt(this.pictures.length)];
		botPic.setAttribute("src", `${randomPic}`);
	}
}

export class ExLovers extends Bots {
	constructor(x, y, dx, dy, img) {
		super(x, y, dx, dy);
		super.updatePosition();
		super.changePicture();
		this.pictures = [
			"./images/bots-pictures/pic-bot-ex-drake-100.jpg",
			"./images/bots-pictures/pic-bot-ex-laverne-100.jpg",
			"./images/bots-pictures/pic-bot-ex-laurence-100.jpg",
			"./images/bots-pictures/pic-bot-ex-meghan-100.jpg",
		];
		this.img = img;
		this.name = "ex";
		this.time = 20;
		this.stress = 10;
	}

	talk() {
		var firstTalk = "Girl! It's been a long time...";

		var talks = [
			"I think I made a mistake!",
			"I'm married. I have 2 kids and a dog now.",
			"I've changed you know...",
		];

		botSpeech.innerHTML = `<p class="talks">${firstTalk}</p>`;

		setTimeout(() => {
			botSpeech.innerHTML += `<p class='talks'> ${
				talks[getRandomInt(talks.length)]
			}`;
		}, 1500);

		player.answerTo(this.name);
	}
}

export class MotherInLaw extends Bots {
	constructor(x, y, dx, dy, img) {
		super(x, y, dx, dy, img);
		super.updatePosition();
		super.changePicture();
		this.pictures = [
			`./images/bots-pictures/pic-bot-madea-1-100.jpg`,
			`./images/bots-pictures/pic-bot-madea-2-100.jpg`,
			`./images/bots-pictures/pic-bot-madea-3-100.jpg`,
		];
		this.img = img;
		this.name = "motherInLaw";
		this.time = 10;
		this.stress = 30;
	}

	talk() {
		var firstTalk = `Hi ${playerName.value.toUpperCase()}!`;

		var talks = [
			`Aren't you at school ???`,
			"When am I going to have grandchildren ?",
			"You look tired.",
			`Your hair is a mess!`,
		];

		botSpeech.innerHTML = `<p class="talks">${firstTalk}</p>`;

		setTimeout(() => {
			botSpeech.innerHTML += `<p class="talks">${
				talks[getRandomInt(talks.length)]
			}</p>`;
		}, 1500);

		player.answerTo(this.name);
	}
}
