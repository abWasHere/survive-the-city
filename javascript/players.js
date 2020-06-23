
class Places extends Bots {
   constructor(name, logo, time, stress, x, y) {
      super(time, stress, x, y);
      this.name = name;
      this.logo = logo;
      super.useTime();
      super.giveStress();
   }
}

const places = [
   {
      name: 'starbucks',
      logo: 'https://img.icons8.com/color/48/000000/starbucks.png',
   },
   {
      name: 'Shopping Mall',
      logo: 'https://img.icons8.com/doodle/96/000000/shopping-bag--v1.png',
   },
   { name: 'university', logo: '' },
   { name: 'office', logo: '' },
   {
      name: 'home',
      logo: 'https://img.icons8.com/doodle/96/000000/cottage--v1.png',
   },
];



class MotherInLaw extends Bots {
   constructor(time, stress, x, y) {
      super(time, stress, x, y);
      super.useTime();
      super.giveStress();
      super.move();
      super.changePicture();
      this.pictures = [
         `../images/bots-pictures/pic-bot-madea-1-100.jpg`,
         `../images/bots-pictures/pic-bot-madea-2-100.jpg`,
         `../images/bots-pictures/pic-bot-madea-3-100.jpg`,
      ];
      this.avatar = `../images/bots-pictures/avatar-mil-madea.png`;
      this.name = 'motherInLaw';
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

/* 
function generateBots(botType, amount) {
   let i = 0;

   do {
      if(type === "ex") {
         const newEx = new ExLovers () 
      } else if (type === "mil") {
         const newMIL = new MotherInLaw ()
         }
   }
}

function generatePlaces(placeType) {
   const coffee = new Places ('starbuck', etc) {

   }
}
 */

/* ---------------------------------------------------- */
/* ----------------------- TESTS ---------------------- */

// const exBoyfriend = new ExLovers(-10, 10, 2, 3);
// const janine = new MotherInLaw();
// janine.changePicture();
// janine.talk();

// const starbucks = new Places ('starbucks', 'https://img.icons8.com/color/48/000000/starbucks.png', 15, -30, 2, 20)

// console.log (starbucks)
// console.log (exBoyfriend)

// console.log(player.manageStress(20));
