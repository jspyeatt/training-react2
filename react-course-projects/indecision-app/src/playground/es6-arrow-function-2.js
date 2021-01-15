const add = function (a,b) {
    console.log(arguments);
    return a+b;
  }
  console.log("add", add(56,1));

  const addArrow = (a,b) => {
    // console.log("arrow add", arguments);  // this will fail because arrow functions can't access arguments.
    return a+b;
  };

  const user = {
    name: 'John',
    cities: ['Madison', 'Verona', 'Memphis'],
    printPlacesLived: function() {
       console.log(this.name);
       console.log(this.cities);
       this.cities.forEach((city) => {
          console.log(this.name,city);   // works fine.
       });
    }
 };
 user.printPlacesLived();

 const user1 = {
    name: 'John',
    cities: ['Moscow', 'Vladivostok', 'St. Petersburg'],
    printPlacesLived() {              // same as es5 function
       console.log(this.name);
       console.log(this.cities);
    }
 };
 user1.printPlacesLived();

 const user2 = {
    name: 'John',
    cities: ['London', 'Manchester', 'Liverpool'],
    printPlacesLived() {              // same as es5 function
       console.log(this.name);
       console.log(this.cities);
    },
    printPlacesLived2() {
       const cityMsgs = this.cities.map((city) => {
          return this.name + ' LIVED ' + city;
       });
       return cityMsgs;
    }
 };
 console.log(user2.printPlacesLived2());

 const multiplier = {
   numbers: [1, 5, 6],
   multiplyBy: 7,
   multiply() {
        return this.numbers.map((v) => v * this.multiplyBy)
   }
 };
 console.log(multiplier.multiply());