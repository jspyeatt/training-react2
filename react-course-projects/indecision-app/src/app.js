
import subtract, { square, add } from './utils.js';
import isSenior, {isAdult, canDrink} from './person.js';
console.log("RUNNING!!!");
console.log(square(4));
console.log(add(4, 3));
console.log(subtract(4, 3));

console.log("can drink", canDrink(12));
console.log("can drink", canDrink(34));
console.log("isadult", isAdult(19));
console.log("isSenior", isSenior(79));