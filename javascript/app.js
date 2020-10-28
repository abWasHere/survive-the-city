const playerName = document.getElementById("landing-player-name");
const playerAnswers = document.getElementById("player-answers");
const gotItBtn = document.getElementById("landing-button-ok");
const level1Btn = document.getElementById("level1");
const level2Btn = document.getElementById("level2");
const level3Btn = document.getElementById("level3");
const levelDisplay = document.getElementById("level-display");
const resetBtn = document.getElementById("reset-button");

import { ctx, canvas, draw } from "./utils/canvas.js";
import { sound } from "./utils/sound.js";
import { loadImage } from "./utils/imageLoad.js";
import { gifReactions } from "./utils/gifReactions.js";
import { winGame } from "./utils/ending.js";
import { getRandomInt } from "./utils/randomInteger.js";
import { university, office, home } from "./utils/places.js";
import { player, chronometer } from "./utils/playerAndChrono.js";
import { ExLovers, MotherInLaw } from "./utils/bots.js";
import { generateBots } from "./utils/generateBots.js";

/* ---------- ANIMATION ---------- */

// to be declared before the animation - will be used later to stop animation
const cancelAnimationFrame = window.cancelAnimationFrame;
var myReq;

export const cancelAnimation = () => {
	cancelAnimationFrame(myReq);
};

function animate(botCollection) {
	// clears the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// updates bots position and draw new position
	botCollection.forEach((bot) => {
		bot.updatePosition();
		draw(bot);
	});

	// draws player and objectives
	draw(player);
	draw(university);
	draw(office);
	draw(home);

	// check every game events (obstacles, accomplishments, time left)

	function gameStatus(botGroup) {
		const shadyGifs = [
			"./images/reactions-gif/gif-nailed-it-shady-sip.gif",
			"./images/reactions-gif/gif-go-away.gif",
			"./images/reactions-gif/gif-smh-insecure.gif",
			"./images/reactions-gif/gif-nailed-it-laugh.gif",
		];

		// check obstacles >> manage stress / time / discussions
		botGroup.forEach((bot) => {
			if (
				player.touchable === true &&
				Math.abs(player.x - bot.x) <= 30 &&
				Math.abs(player.y - bot.y) <= 30
			) {
				//
				console.log("touched by =>", bot.name);

				//PLAYER IS UNTOUCHABLE FOR 4 SECONDS
				// => avoid exponential contacts with bots during the canvas animation (too many frames)
				console.log("player becomes UNTOUCHABLE");
				player.touchable = false;

				// BECOMES TOUCHABLE AGAIN
				player.becomeTouchable();

				// GET STRESS
				player.manageStress(bot.stress);

				// LOSE TIME
				player.loseTime(bot.time);

				// PLAYER & BOT CHANGE PIC
				player.changePlayerPicture();
				bot.changePicture();

				// AND THEY TALK
				bot.talk();

				gifReactions(shadyGifs[getRandomInt(shadyGifs.length)]);
			}
		});

		// 1st accomplishment : university
		if (
			Math.abs(player.x - university.x) <= 35 &&
			Math.abs(player.y - university.y) <= 35 &&
			player.accomplishment === 0
		) {
			gifReactions("./images/reactions-gif/gif-graduated.gif");
			player.accomplishment += 1;
			playerAnswers.innerHTML = `<p class="talks">I'm going to college ! Told ya !</p>`;
			console.log("accomplishment 1/3");
		}
		// 2nd accomplishment : job
		if (
			Math.abs(player.x - office.x) <= 30 &&
			Math.abs(player.y - office.y) <= 30 &&
			player.accomplishment === 1
		) {
			gifReactions("./images/reactions-gif/gif-get-it-girl.gif");
			player.accomplishment += 1;
			playerAnswers.innerHTML = `<p class="talks">This job sucks ...</p>`;
			console.log("accomplishment 2/3");
		}
		//  last accomplishment : home
		if (
			Math.abs(player.x - home.x) <= 30 &&
			Math.abs(player.y - home.y) <= 30 &&
			player.accomplishment === 2
		) {
			console.log("accomplishment 3/3");
			player.stress = 0;
			player.touchable = false;
			playerAnswers.innerHTML = `<p class="talks">FINALLY HOME !</p>`;
			winGame(player);
			cancelAnimationFrame(myReq);
		}
	}
	gameStatus(botCollection);

	// loop this function
	myReq = requestAnimationFrame(() => animate(botCollection)); // this var will be used to stop the animation at the end of the game!
}

/* ---------- PAGE EVENTS ---------- */

function definePlayerName(event) {
	var name = document.querySelectorAll(".player-name");
	[...name].forEach((name) => {
		name.textContent = event.target.value;
	});
}

function setDifficulty(event) {
	levelDisplay.innerText = `${event.target.textContent}`;
}

function startGame() {
	// CHANGEMENT D'INTERFACE

	var body = document.querySelector("body");
	var landingPage = document.querySelector("#landing-page-instructions");
	var mainElements = document.getElementsByClassName("invisible");
	body.classList.toggle("cleaned");
	landingPage.style.display = "none";
	[...mainElements].forEach((elem) => elem.classList.toggle("invisible"));

	// AFFICHAGE NIVEAU DE STRESS

	function displayStress() {
		var stressLvl = document.getElementById("stress");
		if (player.stress >= 100) {
			stressLvl.innerHTML = `I CAN'T !`;
		} else {
			stressLvl.innerHTML = `${player.stress}`;
		}
	}
	displayStress();

	// CHARGEMENT DES AVATARS

	const load1 = loadImage(university.avatar);
	const load2 = loadImage(office.avatar);
	const load3 = loadImage(home.avatar);
	const load4 = loadImage(player.avatar);
	const load5 = loadImage(
		"https://img.icons8.com/ios-filled/50/000000/decision.png"
	);
	const load6 = loadImage(`./images/bots-pictures/avatar-mil-madea.png`);

	// CHARGEMENT DES IMAGES DANS DE NOUVELLES VARIABLES (une fois toutes chargées)

	Promise.all([load1, load2, load3, load4, load5, load6])
		.then((res) => {
			university.img = res[0];
			office.img = res[1];
			home.img = res[2];
			player.img = res[3];

			draw(university);
			draw(office);
			draw(home);
			draw(player);

			// la création de bots est effectuée après que toutes les img aient été chargées puis dessinées

			let exLovers;
			let mothersInLaw;
			let allBots;

			switch (levelDisplay.innerText) {
				case "CHALLENGING":
					exLovers = generateBots(ExLovers, 3, 3, 3, res[4]);
					mothersInLaw = generateBots(MotherInLaw, 1, 6, 6, res[5]);
					allBots = exLovers.concat(mothersInLaw);
					animate(allBots);
					break;
				case "HAAAARD":
					exLovers = generateBots(ExLovers, 4, 3, 3, res[4]);
					mothersInLaw = generateBots(MotherInLaw, 2, 6, 6, res[5]);
					allBots = exLovers.concat(mothersInLaw);
					animate(allBots);
					break;
				default:
					// = 'CHILL'
					exLovers = generateBots(ExLovers, 2, 2, 2, res[4]);
					mothersInLaw = generateBots(MotherInLaw, 1, 5, 5, res[5]);
					allBots = exLovers.concat(mothersInLaw);
					animate(allBots);
			}
		})
		.catch((err) => console.error("Some images failed to load", err));

	document.onkeypress = player.move;

	// FIRST START OF THE CHRONO
	chronometer.startChrono(player);

	// VOLUME
	sound.volume = 0.005;
}

function resetGame() {
	document.location.reload(true); //REFRESH THE PAGE
}

/* ---------- LISTENERS ---------- */

playerName.addEventListener("change", definePlayerName);
level1Btn.addEventListener("click", setDifficulty);
level2Btn.addEventListener("click", setDifficulty);
level3Btn.addEventListener("click", setDifficulty);
gotItBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);
