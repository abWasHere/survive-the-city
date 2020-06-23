/* ---------- DOM GAMEPLAY/INTERFACE */
const playerName = document.getElementById('landing-player-name');
const gotItBtn = document.getElementById('landing-button-ok');
const level1Btn = document.getElementById('level1');
const level2Btn = document.getElementById('level2');
const level3Btn = document.getElementById('level3');
const resetBtn = document.getElementById('reset-button');

/* ---------- DOM PLAYERS */
const playerPic = document.getElementById('picture-player');
const botPic = document.getElementById('picture-bot');
const playerAnswers = document.getElementById('player-answers');
const botSpeech = document.getElementById('bot-speech');
const gifReaction = document.getElementById('gif-reaction');

/* ---------- CANVAS */

// var canvasContainer = document.getElementById('game-interface');
var canvas = document.getElementById('canvas');
canvas.width = 780;
canvas.height = 415;
// la propriété CLIENTWIDTH NE FONCTIONNE PAS ...
var ctx = canvas.getContext('2d');
console.log(canvas.height);

/* ---------- GLOBAL FUNCTIONS */

function getRandomInt(nb) {
   return Math.floor(Math.random() * Math.floor(nb));
}

function gifReactions(gif) {
   gifReaction.setAttribute('src', `${gif}`);
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
            gifBreakdown[getRandomInt(gifGetOut.length)]
         );
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

/* ------------------- CANVAS - DEPLACEMENTS */

function loadAvatar(person) {
   var img = new Image(); // Crée un nouvel élément Image
   ctx.beginPath();
   img.onload = function () {
      ctx.drawImage(img, person.x, person.y, 30, 40);
    };
    ctx.clearRect(0, 0, innerWidth, innerHeight);
   img.src = `${person.avatar}`;
}

/* ---------- PLAYERS */

const player = {
   time: 100,
   stress: 10,
   picture: '../images/pic-tiffany-normal-100.png',
   avatar: '../images/avatar-player-tiffany-50.jpg',
   x: 10,
   y: 10,
   dx: 4, // pas de vélocité en abscisses
   dy: 4, // pas de vélocité en ordonnées

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

   manageStress(effect) {
      this.stress += effect;
      if (this.stress > 100) {
         return gameOver('to much stress');
      } else if (this.stress < 0) {
         playerAnswers.innerHTML = `<p class="talks">Living my best life !</p>`;
         return (this.stress = 0);
      } else {
         return this.stress;
      }
   },

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

   move(event) {
      loadAvatar(player);
      switch (event.code) {
         case 'KeyW':
            if (player.y >= player.dy) {
               player.y -= player.dy;
            }
            console.log('player has moved UP');
            break;
         case 'KeyS':
            if (player.y < canvas.height - player.dy) player.y += player.dy;
            console.log('player has moved DOWN');
            break;
         case 'KeyA':
            if (player.x >= player.dx) player.x -= player.dx;
            console.log('player has moved LEFT');
            break;
         case 'KeyD':
            if (player.x < canvas.width - player.dx) player.x += player.dx;
            console.log('player has moved RIGHT');
            break;
         default:
            alert('please type a valid key : Z - Q - S - D');
      }
      console.log(`player position is x : ${player.x}, y : ${player.y}`);
   },
};

class Bots {
    constructor(time, stress, x, y, dx, dy, pictures, avatars) {
       this.time = time;
       this.stress = stress;
       this.x = x;
       this.y = y;
       this.pictures = pictures;
       this.avatars = avatars;
       this.dx = dx;
       this.dy = dy;
    }
    changePicture() {
       var randomPic = this.pictures[getRandomInt(this.pictures.length)];
       botPic.setAttribute('src', `${randomPic}`);
       botPic.removeAttribute('style');
    }
    move() {
       // change the coordinates
       if (this.x + this.dx > innerWidth || this.x - this.dx < 0) {
          this.dx = -this.dx; // on change de sens sur l'axe des x
       }
       if (y + this.dy > innerHeight || this.y - this.dy < 0) {
          this.dy = -this.dy; // on change de sens sur l'axe des y
       }
       // incrémente les coordonnées des bots
       this.x += this.dx;
       this.y += this.dy;
 
       loadAvatar(this);
    }
 
    useTime() {
       return this.time;
    }
    giveStress() {
       return this.stress;
    }
 }

 class ExLovers extends Bots {
    constructor(time, stress, x, y, dx, dy) {
       super(time, stress, x, y, dx, dy);
       super.useTime();
       super.giveStress();
       super.move();
       super.changePicture();
       this.pictures = [
          '../images/bots-pictures/pic-bot-ex-drake-100.jpg',
          '../images/bots-pictures/pic-bot-ex-laverne-100.jpg',
          '../images/bots-pictures/pic-bot-ex-laurence-100.jpg',
          '../images/bots-pictures/pic-bot-ex-meghan-100.jpg',
       ];
       this.avatars = [
          '../images/bots-pictures/avatar-ex0.png',
          '../images/bots-pictures/avatar-ex1.png',
          '../images/bots-pictures/avatar-ex2.png',
          '../images/bots-pictures/avatar-ex3.png',
          '../images/bots-pictures/avatar-ex4.png',
       ];
       this.name = 'ex';
    }
 
    talk() {
       var firstTalk = "Girl! It's been a long time...";
 
       var talks = [
          'I think I made a mistake!',
          "I'm married. I have 2 kids and a dog now.",
          "I've changed you know...",
       ];
 
       botSpeech.innerHTML = `<p class="talks">${firstTalk}</p>`;
 
       setTimeout(() => {
          botSpeech.innerHTML += `<p class='talks'> ${
             talks[getRandomInt(talks.length)]
          }`;
       }, 4000);
 
       player.answerTo('ex');
    }
 }


/* ---------- CANVAS */

/* ---------- LANDING PAGE EVENTS */

function definePlayerName(event) {
   var name = document.querySelectorAll('.player-name');
   [...name].forEach((name) => {
      name.textContent = event.target.value;
   });
}

function setDifficulty(event) {
   var levelDisplay = document.getElementById('level-display');
   levelDisplay.innerText = `${event.target.textContent}`;

   switch (event.target.id) {
      case 'level2':
         generateBots(ex, 8);
         generateBots(mil, 1);
         break;
      case 'level3':
         generateBots(ex, 10);
         generateBots(mil, 2);
         break;
      default:
         //LEVEL 1
         generateBots(ex, 5);
         generateBots(mil, 1);
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

   loadAvatar(player);

   document.onkeypress = player.move;
}

function resetGame() {
   //REFRESH THE PAGE
   document.location.reload(true);
}

/* ---------- LISTENERS */

playerName.addEventListener('change', definePlayerName);
gotItBtn.addEventListener('click', startGame);
level1Btn.addEventListener('click', setDifficulty);
level2Btn.addEventListener('click', setDifficulty);
level3Btn.addEventListener('click', setDifficulty);
resetBtn.addEventListener('click', resetGame);
