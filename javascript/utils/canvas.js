var canvas = document.getElementById("canvas");
canvas.width = 780;
canvas.height = 415;
var ctx = canvas.getContext("2d");

function draw(obj) {
	ctx.beginPath();
	ctx.drawImage(obj.img, obj.x, obj.y, 70, 70);
	ctx.closePath();
}

export { ctx, canvas, draw };
