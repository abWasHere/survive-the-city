/* ---------- DOM GAMEPLAY/INTERFACE ---------- */
const playerName = document.getElementById('landing-player-name');
const gotItBtn = document.getElementById('landing-button-ok');
const level1Btn = document.getElementById('level1');
const level2Btn = document.getElementById('level2');
const level3Btn = document.getElementById('level3');
const levelDisplay = document.getElementById('level-display');
const resetBtn = document.getElementById('reset-button');

const timeDisplay = document.getElementById('time');

/* ---------- DOM PLAYER + BOTS ---------- */
const playerPic = document.getElementById('picture-player');
const botPic = document.getElementById('picture-bot');
const playerAnswers = document.getElementById('player-answers');
const botSpeech = document.getElementById('bot-speech');
const botTalkBox = document.getElementById('bot-talks');
const gifReaction = document.getElementById('gif-reaction');

/* ---------- IMAGES TO BE LOADED ---------- */

/* ---------- CANVAS ---------- */
// var canvasContainer = document.getElementById('game-interface');
var canvas = document.getElementById('canvas');
// la propriété CLIENTWIDTH NE FONCTIONNE PAS sur le parent de canvas ... donc :
canvas.width = 780;
canvas.height = 415;
var ctx = canvas.getContext('2d');

function draw(obj) {
   ctx.beginPath();
   //var img = new Image(); // Crée un nouvel élément Image
   //img.onload = function () {
   ctx.drawImage(obj.img, obj.x, obj.y, 60, 60);
   //};
   //img.src = `${obj.avatar}`;

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
   playground.innerHTML = `<p class="flex" id="end-game-popup"> ${endgame} </p>`;
   gifReactions(newgif);
}

function gameOver(reason, you) {
   const gifGetOut = [
      //`../images/reactions-gif/gif-get-out.gif`,
      `../images/reactions-gif/gif-fired.gif`,
   ];
   const gifBreakdown = [
      //`../images/reactions-gif/gif-nailed-it-haaaa.gif`,
      `../images/reactions-gif/gif-nailed-it-crazy.gif`,
   ];

   if (you.lose === 0 && you.win === 0) {
      you.lose = 1;

      switch (reason) {
         case 'too much stress':
            closePlayground(
               'GAME OVER <br/> YOU HAD A NERVOUS BREAKDOWN...',
               gifBreakdown[getRandomInt(gifGetOut.length)]
            );
            break;

         case 'no time left':
            closePlayground(
               'GAME OVER <br/> YOU NEED TO IMPROVE TIME MANAGEMENT !',
               gifGetOut[getRandomInt(gifGetOut.length)]
            );
            break;

         default:
            console.log('BUG');
      }
   }
}

function winGame(you) {
   console.log('YOU WIN');

   const gifWin = [
      `../images/reactions-gif/tiffany-dance-wine-home.gif`,
      `../images/reactions-gif/tiffany-made-it.gif`,
      `../images/reactions-gif/gif-proud.gif`,
      `../images/reactions-gif/gif-nailed-it-done.gif`,
   ];

   if (you.win === 0 && you.lose === 0) {
      you.win = 1;
      closePlayground('NAILED IT !!!!!!', gifWin[getRandomInt(gifWin.length)]);
   }
}

/* ---------- PLAYER AND BOTS ---------- */

const player = {
   time: 100,
   stress: 0,
   pictures: '../images/pic-tiffany-normal-100.png',
   avatar: '../images/avatar-player-tiffany-50.jpg',
   x: 130,
   y: 40,
   dx: 7, // pas de vélocité en abscisses
   dy: 7, // pas de vélocité en ordonnées
   accomplishment: 0,
   win: 0,
   lose: 0,

   move(event) {
      // equivalent de updatePosition() des bots
      switch (event.code) {
         case 'KeyW':
            if (player.y >= player.dy) {
               player.y -= player.dy;
            }
            break;
         case 'KeyS':
            if (player.y < canvas.height - player.dy - 42)
               // chiffre trouvé après test console...
               player.y += player.dy;
            break;
         case 'KeyA':
            if (player.x >= player.dx) player.x -= player.dx;
            break;
         case 'KeyD':
            if (player.x < canvas.width - player.dx - 30) player.x += player.dx;
            break;
         default:
            alert('please type a valid key : Z - Q - S - D');
      }
      //console.log(`player position is x : ${player.x}, y : ${player.y}`);
   },

   loseTime(usage) {
      player.time -= usage;
      /* if (this.time <= 0) {
         gameOver('no time left', player);
      } else  */ if (
         player.time > 100
      ) {
         player.time = 100;
      } else if (player.time < 15) {
         playerAnswers.innerHTML = `<p class="talks">Oh sh*t !</p>`;
      } else {
         console.log('time lost : ', usage);
         player.time;
      }
   },

   manageStress(effect) {
      player.stress += effect;
      if (player.stress >= 100) {
         player.stress = 100;
         playerAnswers.innerHTML = `<p class="talks">I CAN'T !</p>`;
      } else if (player.stress < 0) {
         player.stress = 0;
      } /* else {
         player.stress;
      } */
   },

   changePlayerPicture() {
      if (player.stress <= 10) {
         player.picture = '../images/pic-tiffany-normal-100.png';
      } else if (player.stress > 10 && player.stress <= 40) {
         player.picture = '../images/pic-tiffany-mad-100.jpg';
      } else if (player.stress > 40 && player.stress <= 80) {
         player.picture = '../images/pic-tiffany-stresses-100.jpg';
      } else {
         player.picture = '../images/pic-tiffany-escaping-100x150.jpg';
      }

      playerPic.setAttribute('src', `${player.picture}`);
   },

   answerTo(bot) {
      const firstAnswer = 'Heeeeeey!';

      if (bot === 'ex') {
         var answers = [
            `I don't have time for that !`,
            `Hmmm... I'm kind of in a rush...`,
            `It was  nice to see ya! Bye!`,
            `Oh! That's my bus there ! Gotta go !`,
            `I'm late, ok ?!!`,
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
   constructor(x, y, dx, dy) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.pictures = [];
   }

   updatePosition() {
      // change the direction
      if (this.x + this.dx > canvas.width || this.x + this.dx < 0) {
         this.dx = -this.dx; // sur l'axe des x
      }
      if (this.y + this.dy > canvas.height || this.y + this.dy < 0) {
         this.dy = -this.dy; // sur l'axe des y
      }
      // move the bot
      this.x += this.dx;
      this.y += this.dy;
   }

   changePicture() {
      var randomPic = this.pictures[getRandomInt(this.pictures.length)];
      botTalkBox.innerHTML += `<img
      class="picture"
      id="picture-bot"
      style="display: none;"
      alt="bots pics"
      src="${randomPic}"`;
   }
}

class ExLovers extends Bots {
   constructor(x, y, dx, dy, img) {
      super(x, y, dx, dy);
      super.updatePosition();
      super.changePicture();
      this.pictures = [
         '../images/bots-pictures/pic-bot-ex-drake-100.jpg',
         '../images/bots-pictures/pic-bot-ex-laverne-100.jpg',
         '../images/bots-pictures/pic-bot-ex-laurence-100.jpg',
         '../images/bots-pictures/pic-bot-ex-meghan-100.jpg',
      ];
      this.img = img;
      this.name = 'ex';
      this.time = 10;
      this.stress = 10;
      // this.x = x;
      // this.dx = dx;
      // this.y = y;
      // this.dy = dy;
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

      player.answerTo(this.name);
   }
}

class MotherInLaw extends Bots {
   constructor(x, y, dx, dy, img) {
      super(x, y, dx, dy, img);
      super.updatePosition();
      super.changePicture();
      this.pictures = [
         `../images/bots-pictures/pic-bot-madea-1-100.jpg`,
         `../images/bots-pictures/pic-bot-madea-2-100.jpg`,
         `../images/bots-pictures/pic-bot-madea-3-100.jpg`,
      ];
      this.img = img;
      this.name = 'motherInLaw';
      this.time = 5;
      this.stress = 20;
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

      player.answerTo(this.name);
   }
}

/* ---------- ANIMATION ---------- */

// ---- stress level display

function displayStress() {
   var stressLvl = document.getElementById('stress');
   if (player.stress >= 100) {
      stressLvl.innerHTML = `100`;
   } else {
      stressLvl.innerHTML = `${player.stress}`;
   }
}

// ---- chronometer

const chronometer = {
   currentTime: player.time,
   intervalId: 0,   

   startChrono() {
      chronometer.intervalId = setInterval(() => {

         chronometer.currentTime--;

         if (chronometer.currentTime <= 0) {
            chronometer.currentTime = 0;
            clearInterval(chronometer.intervalId);
            cancelAnimationFrame(myReq);
            gameOver('no time left', player);
         }
         if (player.stress >= 100) {
            clearInterval(chronometer.intervalId);
            cancelAnimationFrame(myReq);
            gameOver('too much stress', player);
         }
         timeDisplay.innerHTML = `${chronometer.currentTime}`;
         displayStress();

         //player.time = chronometer.currentTime;

         console.log("counter : ", player.time);
      }, 1000);
   },

   stopChrono() {
      clearInterval(chronometer.intervalId);
   },
};


// ---- bot factory

function generateBots(botType, amount, dx, dy, img) {
   var botGroup = [];
   for (var i = 0; i < amount; i++) {
      // create (amount * bots) with random coordinates and push them in the botGroup array
      var x = Math.random() * canvas.width;
      var y = Math.random() * canvas.height;

      botGroup.push(new botType(x, y, dx, dy, img));
   }
   console.log(botGroup);
   return botGroup;
}

// ---- animation

// to be declared before the animation - will be used later to stop animation
var cancelAnimationFrame = window.cancelAnimationFrame;
var myReq; 
//

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
      /* const shadyGifs = [
         '../images/reactions-gif/gif-nailed-it-shady-sip.gif',
         '../images/reactions-gif/gif-go-away.gif',
         '../images/reactions-gif/gif-smh-insecure.gif',
         '../images/reactions-gif/gif-nailed-it-laugh.gif',
      ]; */

      // check obstacles >> manage stress / time / discussions
      
      player.time = chronometer.currentTime; 

      botGroup.forEach((bot) => {
         if (
            Math.abs(player.x - bot.x) <= 20 &&
            Math.abs(player.y - bot.y) <= 20
         ) {
            //
            console.log('TOUCHED BY A BOT !');
            //
            player.manageStress(bot.stress);
            //
            player.loseTime(bot.time);
            chronometer.stopChrono();
            console.log("player time  at colison is : ", player.time)
            chronometer.startChrono(player);

            player.changePlayerPicture();
            console.log('time left :' + player.time);
            console.log('stress level :' + player.stress);
            bot.changePicture();

            //bot.talk();

            //gifReactions('../images/reactions-gif/gif-smh-insecure.gif');
         }
      });

      // checks chronometer

      // if (player.time === 0) {
      //    chronometer.stopChrono();
      //    gameOver('no time left', player);
      //    cancelAnimationFrame(myReq);
      // }

      // university accomplishment
      if (
         Math.abs(player.x - university.x) <= 30 &&
         Math.abs(player.y - university.y) <= 30 &&
         player.accomplishment === 0
      ) {
         //gifReactions('../images/reactions-gif/gif-graduated.gif');
         player.accomplishment += 1;
         playerAnswers.innerHTML = `<p class="talks">I'm going to college ! Told ya !</p>`;
         console.log('accomplishment 1/3');
      }
      // job accomplishment
      if (
         Math.abs(player.x - office.x) <= 30 &&
         Math.abs(player.y - office.y) <= 30 &&
         player.accomplishment === 1
      ) {
         //gifReactions('../images/reactions-gif/gif-get-it-girl.gif');
         player.accomplishment += 2;
         playerAnswers.innerHTML = `<p class="talks">This job sucks.</p>`;
         console.log('accomplishment 2/3');
      }
      //  home accomplishment
      if (
         Math.abs(player.x - home.x) <= 30 &&
         Math.abs(player.y - home.y) <= 30 &&
         player.accomplishment === 3
      ) {
         console.log('accomplishment 3/3');
         playerAnswers.innerHTML = `<p class="talks">FINALLY HOME !</p>`;
         winGame(player);
         cancelAnimationFrame(myReq);
      }
   }
   gameStatus(botCollection);

   // loop this function
   //requestAnimationFrame(() => animate(botCollection));
   myReq = requestAnimationFrame(() => animate(botCollection)); // this var will be used to stop the animation at the end of the game!
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

/* ---------- PAGE EVENTS ---------- */

function definePlayerName(event) {
   var name = document.querySelectorAll('.player-name');
   [...name].forEach((name) => {
      name.textContent = event.target.value;
   });
}

function setDifficulty(event) {
   levelDisplay.innerText = `${event.target.textContent}`;
}

function loadImage(url) {
   return new Promise((resolve, reject) => {
      var img = new Image();
      img.src = url;
      img.onload = function (evt) {
         resolve(evt.path[0]);
      };
      img.onerror = (err) => reject(err);
   });
}

function startGame() {
   // CHANGEMENT D'INTERFACE

   var body = document.querySelector('body');
   var landingPage = document.querySelector('#landing-page-instructions');
   var mainElements = document.getElementsByClassName('main');
   body.classList.toggle('cleaned');
   landingPage.style.display = 'none';
   [...mainElements].forEach((elem) => (elem.style.display = 'initial'));

   // AFFICHAGE NIVEAU DE STRESS

   function displayStress() {
      var stressLvl = document.getElementById('stress');
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
   const load5 = loadImage('../images/bots-pictures/avatar-ex0.png');
   const load6 = loadImage(`../images/bots-pictures/avatar-mil-madea.png`);
   //const load7 = (shadyGifs.forEach(gif => loadImage(gif)))

   // CHARGEMENT DES IMAGES DANS DE NOUVELLES VARIABLES (une fois toutes chargées)

   Promise.all([load1, load2, load3, load4, load5, load6])
      .then((res) => {
         university.img = res[0];
         office.img = res[1];
         home.img = res[2];
         player.img = res[3];
         //shadyGifsLoaded = res[6];

         draw(university);
         draw(office);
         draw(home);
         draw(player);

         // la création de bots est effectuée après que toutes les img aient été chargées puis dessinées

         let exLovers;
         let mothersInLaw;
         let allBots;

         switch (levelDisplay.innerText) {
            case 'CHALLENGING':
               exLovers = generateBots(ExLovers, 3, 3, 3, res[4]);
               mothersInLaw = generateBots(MotherInLaw, 1, 4, 4, res[5]);
               allBots = exLovers.concat(mothersInLaw);
               animate(allBots);
               break;
            case 'HAAAARD':
               exLovers = generateBots(ExLovers, 4, 3, 3, res[4]);
               mothersInLaw = generateBots(MotherInLaw, 2, 4, 4, res[5]);
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
      .catch((err) => console.error(err));

   document.onkeypress = player.move;

   // AFFICHAGE DU CHRONO

   chronometer.startChrono(player);
   // chronometerOn(player);
}

function resetGame() {
   //REFRESH THE PAGE
   document.location.reload(true);
}

/* ---------- LISTENERS ---------- */

playerName.addEventListener('change', definePlayerName);
level1Btn.addEventListener('click', setDifficulty);
level2Btn.addEventListener('click', setDifficulty);
level3Btn.addEventListener('click', setDifficulty);
gotItBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
