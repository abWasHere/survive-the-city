/* ------------------- DOM ELEMENTS */

const playerPic = document.getElementById('picture-player');
const botPic = document.getElementById('picture-bot');
const playerAnswers = document.getElementById('player-answers');
const botSpeech = document.getElementById('bot-speech');

/* ------------------- CANVAS DEFINITION */

var canvasContainer = document.getElementById('game-interface');
var canvas = document.querySelector('canvas');
canvas.width = canvasContainer.clientWidth;
canvas.height = canvasContainer.clientHeight; // inner size of an element in px
var c = canvas.getContext('2d');

/* ------------------- SHARED FUNCTIONS */

function getRandomInt(nb) {
   return Math.floor(Math.random() * Math.floor(nb));
}
// console.log(getRandomInt(4)) // returns an integer between 0 and 3

/* ------------------- VITESSE DEPLACEMENT PLAYER */

var dx = 5; // pas de vélocité en abscisses
var dy = 5; // pas de vélocité en ordonnées

/* ------------------- PLAYER OBJECT */

const player = {
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
         this.picture = '../images/pic-tiffany-mad-100.jpg';
      } else this.picture = '../images/pic-tiffany-escaping-100x150.jpg.jpg';

      playerPicture.setAttribute('src', `${this.picture}`);
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

   loseTime() {},

   getStress() {},

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

class Bots {
   constructor(time, stress, x, y) {
      this.avatar = 'avatar';
      this.pictures = 'pictures';
      this.time = time;
      this.stress = stress;
      this.x = x; // position x
      this.y = y; // position y
   }
   changePicture() {
      var randomPic = this.pictures[getRandomInt(this.pictures.length)];
      botPic.setAttribute('src', `${randomPic}`);
      botPic.removeAttribute('style');
   }
   move() {
      return `${this.name} has moved`; // A CHANGER !!!
   }
   useTime() {
      return this.time
   }
   giveStress() {
      return this.stress;
   }
}

class Places extends Bots {
   constructor(name, logo, time, stress, x, y) {
      super(time, stress, x, y);
      this.name = name;
      this.logo = logo;
      super.useTime();
      super.giveStress();
   }  
}

class ExLovers extends Bots {
   constructor(time, stress, x, y) {
      super(time, stress, x, y);
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
      super.move();
      super.changePicture();
      super.giveStress();
      super.useTime();
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

class MotherinLaw extends Bots {
   constructor(time, stress, x, y) {
      super(time, stress, x, y);
      this.pictures = [
         `../images/bots-pictures/pic-bot-madea-1-100.jpg`,
         `../images/bots-pictures/pic-bot-madea-2-100.jpg`,
         `../images/bots-pictures/pic-bot-madea-3-100.jpg`,
      ];
      this.avatar = `../images/bots-pictures/avatar-mil-madea.png`;
      this.name = 'motherInLaw';
      super.move();
      super.giveStress();
      super.useTime();
      super.changePicture();
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

function generateBots() {}

/* ---------------------------------------------------- */
/* ----------------------- TESTS ---------------------- */

// const exBoyfriend = new ExLovers(-10, 10, 2, 3);
// const janine = new MotherinLaw();
// janine.changePicture();
// janine.talk();


// const starbucks = new Places ('starbucks', 'https://img.icons8.com/color/48/000000/starbucks.png', 15, -30, 2, 20)

// console.log (starbucks)
// console.log (exBoyfriend)