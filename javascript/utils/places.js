import { getRandomInt } from "./randomInteger.js";

export const university = {
	x: 600,
	y: getRandomInt(canvas.height - 60),
	avatar: `./images/places/university.png`,
};

export const office = {
	x: 30,
	y: getRandomInt(canvas.height - 60),
	avatar: `./images/places/office2.png`,
};

export const home = {
	x: getRandomInt(canvas.width - 60),
	y: 20,
	avatar: `./images/places/home3.png`,
};
