export function loadImage(url) {
	return new Promise((resolve, reject) => {
		var img = new Image();
		img.src = url;
		img.onload = function (evt) {
			resolve(evt.path[0]);
		};
		img.onerror = (err) => reject(err);
	});
}
