const square = function(x) {
    return x * x;
 }
console.log("square", square(4));
const squareArrow = (x) => {
    return x * x;
  };
console.log("squareArrow", squareArrow(5));

const arrowExp = (x) => x * x;
console.log("arrowExp", arrowExp(6));

const fullName = "John Pyeatt";

const getFirstName = (fn) => {
    return fn.split(' ')[0];
}
console.log("first name " + getFirstName(fullName));

const getLastName = (full) => full.split(' ')[1];

console.log("last name " + getLastName(fullName));