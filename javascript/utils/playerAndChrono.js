import { canvas } from "./canvas.js";
import { getRandomInt } from "./randomInteger.js";
import { gameOver } from "./ending.js";
import { cancelAnimation } from "../app.js";

const playerPic = document.getElementById("picture-player");
const playerAnswers = document.getElementById("player-answers");

const timeDisplay = document.getElementById("time");

export const player = {
	duration: 90,
	stress: 0,
	pictures: "./images/pic-tiffany-normal-100.png",
	avatar: "./images/animated-avatar.gif",
	x: 100,
	y: 90,
	dx: 7, // pas de vélocité en abscisses
	dy: 7, // pas de vélocité en ordonnées
	accomplishment: 0,
	win: 0,
	lose: 0,
	touchable: true, // if true, the player cannot be touched again during the animation

	becomeTouchable() {
		// this function make player touchable: true in animation
		if (!player.touchable) {
			setTimeout(() => {
				player.touchable = true;
				console.log("player becomes TOUCHABLE AGAIN");
			}, 1300);
		}
	},

	move(event) {
		// equivalent to bots' updatePosition() method
		switch (event.code) {
			case "KeyW":
				if (player.y >= player.dy) {
					player.y -= player.dy;
				}
				break;
			case "KeyS":
				if (player.y < canvas.height - player.dy - 42)
					// 42 was found by 'trial and error', it is the approximative size of the Player's avatar
					player.y += player.dy;
				break;
			case "KeyA":
				if (player.x >= player.dx) player.x -= player.dx;
				break;
			case "KeyD":
				if (player.x < canvas.width - player.dx - 30) player.x += player.dx;
				break;
			default:
				alert("please type a valid key : Z - Q - S - D");
		}
	},

	loseTime(time) {
		let newTime = chronometer.decrementChrono(time);
		if (newTime < 15) {
			playerAnswers.innerHTML = `<p class="talks">Oh sh*t !</p>`;
		}
	},

	manageStress(effect) {
		if (player.stress + effect >= 100) {
			player.stress = 100;
			playerAnswers.innerHTML = `<p class="talks">I CAN'T !</p>`;
		} else if (player.stress + effect < 0) {
			player.stress = 0;
		} else {
			player.stress += effect;
		}
	},

	changePlayerPicture() {
		if (player.stress <= 10) {
			player.picture = "./images/pic-tiffany-normal-100.png";
		} else if (player.stress > 10 && player.stress <= 40) {
			player.picture = "./images/pic-tiffany-mad-100.jpg";
		} else if (player.stress > 40 && player.stress <= 80) {
			player.picture = "./images/pic-tiffany-stresses-100.jpg";
		} else {
			player.picture = "./images/pic-tiffany-escaping-100x150.jpg";
		}

		playerPic.setAttribute("src", `${player.picture}`);
	},

	answerTo(bot) {
		const firstAnswer = "Heeeeeey!";

		if (bot === "ex") {
			var answers = [
				`I don't have time for that !`,
				`Hmmm... I'm kind of in a rush...`,
				`It was  nice to see ya! Bye!`,
				`Oh! That's my bus there ! Gotta go !`,
				`I'm late, ok ?!!`,
			];
		} else if (bot === "motherInLaw") {
			var answers = [
				`I don't know what you're talking about ^^`,
				`Oh! That's my bus there ! Gotta go !`,
				`See you on Sunday ?`,
			];
		}

		playerAnswers.innerHTML = `<p class="talks">${firstAnswer}</p>`;

		// 3 seconds after, Player is giving a second random answer :
		setTimeout(() => {
			playerAnswers.innerHTML += `<p class="talks">
          ${answers[getRandomInt(answers.length)]}
       </p>`;
		}, 3000);
	},
};

function displayStress() {
	var stressLvl = document.getElementById("stress");
	if (player.stress >= 100) {
		stressLvl.innerHTML = `100`;
	} else {
		stressLvl.innerHTML = `${player.stress}`;
	}
}

export const chronometer = {
	currentTime: player.duration,
	intervalId: 0,

	startChrono() {
		chronometer.intervalId = setInterval(() => {
			chronometer.currentTime--;

			if (chronometer.currentTime <= 0) {
				chronometer.currentTime = 0;
				clearInterval(chronometer.intervalId);
				cancelAnimation();
				gameOver("no time left", player);
			}
			if (player.stress >= 100) {
				clearInterval(chronometer.intervalId);
				cancelAnimation();
				gameOver("too much stress", player);
			}
			timeDisplay.innerHTML = `${chronometer.currentTime}`;
			displayStress();
		}, 1000);
	},

	decrementChrono(time) {
		chronometer.currentTime -= time;
		return chronometer.currentTime;
	},

	stopChrono() {
		clearInterval(chronometer.intervalId);
	},
};
