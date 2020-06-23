
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




/* 
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
