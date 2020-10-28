import { canvas } from "./canvas.js";

export function generateBots(botType, amount, dx, dy, img) {
	var botGroup = [];
	for (var i = 0; i < amount; i++) {
		// create (amount * bots) with random coordinates and push them in the botGroup array
		var x = Math.random() * canvas.width;
		var y = Math.random() * canvas.height;

		botGroup.push(new botType(x, y, dx, dy, img));
	}
	return botGroup;
}
