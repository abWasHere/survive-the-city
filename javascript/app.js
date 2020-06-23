/* ---------- DOM GAMEPLAY/INTERFACE */
const playerName = document.getElementById('landing-player-name');
const gotItBtn = document.getElementById('landing-button-ok');
const gifReaction = document.getElementById('gif-reaction');
const level1Btn = document.getElementById('level1');
const level2Btn = document.getElementById('level2');
const level3Btn = document.getElementById('level3');

/* ---------- DOM PLAYERS */
const playerPic = document.getElementById('picture-player');
const botPic = document.getElementById('picture-bot');
const playerAnswers = document.getElementById('player-answers');
const botSpeech = document.getElementById('bot-speech');


/* ---------- PLAYGROUND EVENTS */

function gifReactions(gif) {
    gifReaction.setAttribute('src', `${gif}`);
}
 
/* ---------- END GAME EVENTS */
 
 function getRandomInt(nb) {
    return Math.floor(Math.random() * Math.floor(nb));
 }
 
 function closePlayground(endgame, newgif) {
    var playground = document.getElementById('game-interface');
    playground.innerHTML = `<p class="flex" style="flex-direction: column; align-items: center"> ${endgame} </p>`;
 
    gifReaction(newgif);
 }
 
 function gameOver(reason) {
    const gifGetOut = [
       `../images/reactions-gif/gif-get-out.gif`,
       `../images/reactions-gif/gif-fired.gif`,
    ];
    const gifBreakdown = [
       `../images/reactions-gif/gif-nailed-it-haaaa.gif`,
       `../images/reactions-gif/gif-nailed-it-crazy.gif`,
    ];
 
    switch (reason) {
       case 'too much stress':
          closePlayground(
             'GAME OVER - YOU HAD A NERVOUS BREAKDOWN...',
             gifBreakdown[getRandomInt(gifGetOut.length)]);
          break;
 
       case 'no time left':
          closePlayground(
             'GAME OVER - YOU NEED TO IMPROVE TIME MANAGEMENT !',
             gifGetOut[getRandomInt(gifGetOut.length)]
          );
          break;
 
       default:
          console.log('BUG');
    }
 }
 
 function winGame() {
    console.log('YOU WIN');
    const gifWin = [
       `../images/reactions-gif/tiffany-dance-wine-home.gif`,
       `../images/reactions-gif/tiffany-made-it.gif`,
       `../images/reactions-gif/gif-proud.gif`,
       `../images/reactions-gif/gif-nailed-it-done.gif`,
    ];
 
    closePlayground('NAILED IT !!!!!!', gifWin.getRandomInt(gifWin.length));
 }

/* ---------- PLAYERS */

const player = {
   name: 'Tiffany',
   time: 100,
   stress: 10,
   picture: '../images/pic-tiffany-normal-100.png',
   avatar: '../images/avatar-player-tiffany-50.jpg.png',
   x: 10,
   y: 10,

   changePicture() {
      if (this.stress <= 10) {
         this.picture = '../images/pic-tiffany-normal-100.png';
      } else if (this.stress > 10 && this.stress <= 40) {
         this.picture = '../images/pic-tiffany-mad-100.jpg';
      } else if (this.stress > 40 && this.stress <= 80) {
         this.picture = '../images/pic-tiffany-stresses-100.jpg';
      } else this.picture = '../images/pic-tiffany-escaping-100x150.jpg';

      playerPic.setAttribute('src', `${this.picture}`);
   },

   answerTo(bot) {
      const firstAnswer = 'Heeeeeey!';

      if (bot === 'ex') {
         var answers = [
            `I don't have time for that !`,
            `Hmmm... I'm kind of in a rush...`,
            `It was  nice to see ya! Bye!`,
         ];
      } else if (bot === 'motherInLaw') {
         var answers = [
            `I don't know what you're talking about ^^`,
            `Oh! That's my bus there ! Gotta go !`,
            `See you on Sunday ?`,
         ];
      } else if (bot === 'obstacles') {
         var answers = [
            `Oh! That's my bus there ! Gotta go !`,
            `Sorry... Me no speak english...`,
            `I'm late, ok ?!!`,
         ];
      }

      playerAnswers.innerHTML = `<p class="talks">${firstAnswer}</p>`;

      setTimeout(() => {
         playerAnswers.innerHTML += `<p class="talks">
          ${answers[getRandomInt(answers.length)]}
       </p>`;
      }, 5500);
   },

   manageStress(effect) {
      this.stress += effect;
      if (this.stress > 100) {
         return gameOver('to much stress');
      } else if (this.stress < 0) {
         playerAnswers.innerHTML = `<p class="talks">Living my best life !</p>`;
         return (this.stress = 0);
      } else {
         console.log(this.stress);
         return this.stress;
      }
   },

   loseTime(usage) {
      this.time -= usage;
      if (this.time <= 100) {
         return gameOver('no time left');
      } else if (this.time > 100) {
         return (this.time = 100);
      } else if (this.time < 15) {
         playerAnswers.innerHTML = `<p class="talks">Oh sh*t !</p>`;
      } else {
         console.log(this.time);
         return this.time;
      }
   },

   // modifier les unités si utilisation du CANVAS
   moveUp() {
      if (this.player.y > 0) this.player.y -= dy;
   },
   moveDown() {
      if (this.player.y > canvas.innerHeight) this.player.y += dy;
   },
   moveLeft() {
      if (this.player.x > 0) this.player.y -= dx;
   },
   moveUp() {
      if (this.player.x < canvas.innerWidth) this.player.y += dx;
   },
};


/* ---------- LANDING PAGE EVENTS */

function definePlayerName(event) {
   var name = document.querySelectorAll('.player-name');
   [...name].forEach((name) => {
      name.textContent = event.target.value;
   });
}

function setDifficulty(event) {
   switch (event.target.id) {
      case 'level1':
         console.log(event.target.id, event.target.textContent);
         generateBots(ex, 5);
         generateBots(mil, 1);
         break;

      case 'level2':
         console.log(event.target.id, event.target.textContent);
         generateBots(ex, 8);
         generateBots(mil, 1);
         break;
      case 'level3':
         console.log(event.target.id, event.target.textContent);
         generateBots(ex, 10);
         generateBots(mil, 2);
         break;
   }
}

function chronometerOn() {
   var time = document.getElementById('time');
   var currentTime = player.time;

   let intervalId = setInterval(() => {
      time.innerHTML = `${currentTime}`;
      player.time = currentTime;
      if (currentTime <= 0) {
         clearInterval(intervalId);
      }
      currentTime--;
   }, 1000);
}

function displayStress() {
   var stressLvl = document.getElementById('stress');
   if (player.stress >= 100) {
      stressLvl.innerHTML = `I CAN'T !`;
   } else {
      stressLvl.innerHTML = `${player.stress}`;
   }
   console.log('stress level : ' + stressLvl.innerText);
}

function startGame() {
   // DOIT RECEVOIR TOUTES LES FONCTIONS DE LANCEMENT DE JEU !
   var body = document.querySelector('body');
   var landingPage = document.querySelector('#landing-page-instructions');
   var mainElements = document.getElementsByClassName('main');

   body.classList.toggle('cleaned');
   landingPage.style.display = 'none';
   [...mainElements].forEach((elem) => (elem.style.display = 'initial'));

   chronometerOn();
   displayStress();
}


/* ---------- LISTENERS */

playerName.addEventListener('change', definePlayerName);
gotItBtn.addEventListener('click', startGame);
level1Btn.addEventListener('click', setDifficulty);
level2Btn.addEventListener('click', setDifficulty);
level3Btn.addEventListener('click', setDifficulty);
