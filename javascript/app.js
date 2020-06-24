/* ---------- DOM GAMEPLAY/INTERFACE */
const playerName = document.getElementById('landing-player-name');
const gotItBtn = document.getElementById('landing-button-ok');
const level1Btn = document.getElementById('level1');
const level2Btn = document.getElementById('level2');
const level3Btn = document.getElementById('level3');
const levelDisplay = document.getElementById('level-display');
const resetBtn = document.getElementById('reset-button');

/* ---------- DOM PLAYERS */
const playerPic = document.getElementById('picture-player');
const botPic = document.getElementById('picture-bot');
const playerAnswers = document.getElementById('player-answers');
const botSpeech = document.getElementById('bot-speech');
const botTalkBox = document.getElementById('bot-talks');
const gifReaction = document.getElementById('gif-reaction');

/* ---------- CANVAS ---------- */

// var canvasContainer = document.getElementById('game-interface');
var canvas = document.getElementById('canvas');
canvas.width = 780;
canvas.height = 415;
// la propriété CLIENTWIDTH NE FONCTIONNE PAS ...
var ctx = canvas.getContext('2d');
console.log(canvas.height);

function draw(obj) {
   ctx.beginPath();
   var img = new Image(); // Crée un nouvel élément Image
   img.onload = function () {
      ctx.drawImage(img, obj.x, obj.y, 45, 45);
   };
   img.src = `${obj.avatar}`;

   ctx.closePath();
}

/* ---------- GLOBAL FUNCTIONS ---------- */

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

/* ---------- PLAYER AND BOTS ---------- */

const player = {
   time: 100,
   stress: 10,
   pictures: '../images/pic-tiffany-normal-100.png',
   avatar: '../images/avatar-player-tiffany-50.jpg',
   x: 10,
   y: 10,
   dx: 4, // pas de vélocité en abscisses
   dy: 4, // pas de vélocité en ordonnées
   accomplishment: 0,

   move(event) {
      // equivalent de updatePosition() des bots
      draw(player);
      switch (event.code) {
         case 'KeyW':
            if (player.y >= player.dy) {
               player.y -= player.dy;
            }
            console.log('player has moved UP');
            break;
         case 'KeyS':
            if (player.y < canvas.height - player.dy - 42)
               // chiffre trouvé après test console...
               player.y += player.dy;
            console.log('player has moved DOWN');
            break;
         case 'KeyA':
            if (player.x >= player.dx) player.x -= player.dx;
            console.log('player has moved LEFT');
            break;
         case 'KeyD':
            if (player.x < canvas.width - player.dx - 30) player.x += player.dx;
            console.log('player has moved RIGHT');
            break;
         default:
            alert('please type a valid key : Z - Q - S - D');
      }
      console.log(`player position is x : ${player.x}, y : ${player.y}`);
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
};

class Bots {
   constructor(time, stress, x, y, dx, dy, pictures, avatar) {
      this.time = time;
      this.stress = stress;
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.pictures = [pictures];
      this.avatar = avatar;
   }

   changePicture() {
      var randomPic = this.pictures[getRandomInt(this.pictures.length)];
      botTalkBox.innerHTML += `<img
      class="picture"
      id="picture-bot"
      style="display: none;"
      alt="bots pics"
      src="${this.picture}"`;
   }

   updatePosition() {
      // change the direction
      if (this.x + this.dx > canvas.width || this.x - this.dx < 0) {
         this.dx = -this.dx; // sur l'axe des x
      }
      if (this.y + this.dy > canvas.height || this.y - this.dy < 0) {
         this.dy = -this.dy; // sur l'axe des y
      }
      // move the bot
      this.x += this.dx;
      this.y += this.dy;

      draw(this);
   }

   useTime() {
      return this.time;
   }
   giveStress() {
      return this.stress;
   }
}

class ExLovers extends Bots {
   constructor(x, y, dx, dy) {
      super(x, y, dx, dy);
      super.useTime();
      super.giveStress();
      // super.drawAvatar();
      super.updatePosition();
      super.changePicture();
      this.pictures = [
         '../images/bots-pictures/pic-bot-ex-drake-100.jpg',
         '../images/bots-pictures/pic-bot-ex-laverne-100.jpg',
         '../images/bots-pictures/pic-bot-ex-laurence-100.jpg',
         '../images/bots-pictures/pic-bot-ex-meghan-100.jpg',
      ];
      /* this.avatars = [
         '../images/bots-pictures/avatar-ex0.png',
         '../images/bots-pictures/avatar-ex1.png',
         '../images/bots-pictures/avatar-ex2.png',
         '../images/bots-pictures/avatar-ex3.png',
         '../images/bots-pictures/avatar-ex4.png',
      ]; */
      this.avatar = '../images/bots-pictures/avatar-ex0.png';
      this.name = 'ex';
      this.time = 10;
      this.stress = 15;
      this.x = x;
      this.dx = dx;
      this.y = y;
      this.dy = dy;
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

class MotherInLaw extends Bots {
   constructor(x, y, dx, dy) {
      super(x, y, dx, dy);
      super.useTime();
      super.giveStress();
      // super.drawAvatar();
      super.updatePosition();
      super.changePicture();
      this.pictures = [
         `../images/bots-pictures/pic-bot-madea-1-100.jpg`,
         `../images/bots-pictures/pic-bot-madea-2-100.jpg`,
         `../images/bots-pictures/pic-bot-madea-3-100.jpg`,
      ];
      this.avatar = `../images/bots-pictures/avatar-mil-madea.png`;
      this.name = 'motherInLaw';
      this.x = x;
      this.dx = dx;
      this.y = y;
      this.dy = dy;
   }

   talk() {
      var firstTalk = 'Hi Tiffany!';

      var talks = [
         `Aren't you at school ???`,
         'When am I going to have grandchildren ?',
         'You look tired.',
         `Your hair is a mess!`,
      ];

      botSpeech.innerHTML = `<p class="talks">${firstTalk}</p>`;

      setTimeout(() => {
         botSpeech.innerHTML += `<p class="talks">${
            talks[getRandomInt(talks.length)]
         }</p>`;
      }, 3500);

      player.answerTo('motherInLaw');
   }
}

function generateBots(botType, amount, dx, dy) {
   var botGroup = [];
   for (var i = 0; i < amount; i++) {
      // create amount*bots with random coordinates and push them in the botGroup array
      var x = Math.random() * canvas.width;
      var y = Math.random() * canvas.height;

      botGroup.push(new botType(x, y, dx, dy));
   }

   console.log(botGroup);
   return botGroup;
}

function animate(botCollection) {
   botCollection.forEach((bot) => bot.updatePosition());
   document.onkeypress = player.move;

   ctx.clearRect(0, 0, canvas.width, canvas.height);
   requestAnimationFrame(animate); // loop inside the animate function
}

/* ---------- ACCOMPLISHMENTS OBJECTS ---------- */

const university = {
   x: 300,
   y: 10,
   avatar: `../images/places/university.png`,
};
const office = {
   x: 50,
   y: 300,
   avatar: `../images/places/office.png`,
};
const home = {
   x: 700,
   y: 300,
   avatar: `../images/places/home.png`,
};

function gameStatus() { // COMMENT LANCER CETTE FONCTION CONSTAMMENT ???

   botGroup.forEach((bot) => {
      if (player.x === bot.x && player.y === bot.y) {
         player.manageStress(bot.giveStress);
         player.loseTime(bot.useTime);
      }
   });

   if (player.time === 0) {
      gameOver('no time left');
   }

   // university accomplishment
   if (
      player.x === university.x &&
      player.y === university.y &&
      player.accomplishment === 0
   ) {
      player.accomplishment += 1;
   }
   // job accomplishment
   if (
      player.x === office.x &&
      player.y === office.y &&
      player.accomplishment === 1
   ) {
      player.accomplishment += 2;
   }
   //  home accomplishment
   if (
      player.x === home.x &&
      player.y === home.y &&
      player.accomplishment === 3
   ) {
      winGame();
   }
}

/* ---------- PAGE EVENTS ---------- */

function definePlayerName(event) {
   var name = document.querySelectorAll('.player-name');
   [...name].forEach((name) => {
      name.textContent = event.target.value;
   });
}

function setDifficulty(event) {
   levelDisplay.innerText = `${event.target.textContent}`;
   /* 
   switch (event.target.id) {
      case 'level2':
         animate(generateBots(ExLovers, 5, 4, 4));
         animate(generateBots(MotherInLaw, 1, 6, 6));
         break;
      case 'level3':
         animate(generateBots(ExLovers, 6, 5, 5));
         animate(generateBots(MotherInLaw, 2, 6, 6));
         break;
      default:
         //LEVEL 1
         animate(generateBots(ExLovers, 4, 3, 3));
         animate(generateBots(MotherInLaw, 1, 5, 5));
   } */
}

function startGame() {

   var body = document.querySelector('body');
   var landingPage = document.querySelector('#landing-page-instructions');
   var mainElements = document.getElementsByClassName('main');
   body.classList.toggle('cleaned');
   landingPage.style.display = 'none';
   [...mainElements].forEach((elem) => (elem.style.display = 'initial'));

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
   chronometerOn();

   function displayStress() {
      var stressLvl = document.getElementById('stress');
      if (player.stress >= 100) {
         stressLvl.innerHTML = `I CAN'T !`;
      } else {
         stressLvl.innerHTML = `${player.stress}`;
      }
   }
   displayStress();

   window.onload = draw(university);
   window.onload = draw(office);
   window.onload = draw(home);
   window.onload = draw(player);

   switch (levelDisplay.id) {
      case 'level2':
         animate(generateBots(ExLovers, 5, 4, 4));
         animate(generateBots(MotherInLaw, 1, 6, 6));
         break;
      case 'level3':
         animate(generateBots(ExLovers, 6, 5, 5));
         animate(generateBots(MotherInLaw, 2, 6, 6));
         break;
      default:
         // = level 1
         animate(generateBots(ExLovers, 4, 3, 3));
         animate(generateBots(MotherInLaw, 1, 5, 5));
   }

   // document.onkeypress = player.move;
}

function resetGame() {
   //REFRESH THE PAGE
   document.location.reload(true);
}

/* ---------- LISTENERS ---------- */

playerName.addEventListener('change', definePlayerName);
gotItBtn.addEventListener('click', startGame);
level1Btn.addEventListener('click', setDifficulty);
level2Btn.addEventListener('click', setDifficulty);
level3Btn.addEventListener('click', setDifficulty);
resetBtn.addEventListener('click', resetGame);
