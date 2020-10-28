import { sound, switchSound } from "./sound.js";
import { gifReactions } from "./gifReactions.js";
import { getRandomInt } from "./randomInteger.js";

function closePlayground(endgame, newgif) {
	const playground = document.getElementById("game-interface");
	playground.innerHTML = `<p class="flex" id="end-game-popup"> ${endgame} </p>`;
	gifReactions(newgif);

	const gameTalks = document.getElementById("game-talks");

	gameTalks.innerHTML = `<img
   class="picture"
   id="picture-player"
   src="./images/pic-tiffany-normal-100.png"
   alt="gif"/>`;

	sound.pause;
}

export function gameOver(reason, you) {
	switchSound("./audio/fail-sound-effect.mp3");

	const gifGetOut = [
		`./images/reactions-gif/gif-get-out.gif`,
		`./images/reactions-gif/gif-fired.gif`,
	];
	const gifBreakdown = [
		`./images/reactions-gif/gif-nailed-it-haaaa.gif`,
		`./images/reactions-gif/gif-nailed-it-crazy.gif`,
	];

	if (you.lose === 0 && you.win === 0) {
		you.lose = 1;

		switch (reason) {
			case "too much stress":
				closePlayground(
					"GAME OVER <br/> YOU HAD A NERVOUS BREAKDOWN !",
					gifBreakdown[getRandomInt(gifBreakdown.length)]
				);
				break;

			case "no time left":
				closePlayground(
					"GAME OVER <br/> YOU NEED TO IMPROVE TIME MANAGEMENT !",
					gifGetOut[getRandomInt(gifGetOut.length)]
				);
				break;

			default:
				console.log("BUG");
		}
	}
}

export function winGame(you) {
	console.log("YOU WIN");

	const gifWin = [
		`./images/reactions-gif/tiffany-dance-wine-home.gif`,
		`./images/reactions-gif/tiffany-made-it.gif`,
		`./images/reactions-gif/gif-proud.gif`,
		`./images/reactions-gif/gif-nailed-it-done.gif`,
	];

	if (you.win === 0 && you.lose === 0) {
		you.win = 1;
		closePlayground("NAILED IT !!!!!!", gifWin[getRandomInt(gifWin.length)]);
	}
}
