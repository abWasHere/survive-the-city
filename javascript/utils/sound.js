const sound = document.getElementById("audio");

sound.volume = 0.005;

function switchSound(src) {
	sound.pause();
	sound.removeAttribute("loop");
	sound.innerHTML = `
  <source src=${src} type="audio/mp3">`;
	sound.load();
	sound.play();
	sound.currentTime = 0;
}

export { sound, switchSound };
