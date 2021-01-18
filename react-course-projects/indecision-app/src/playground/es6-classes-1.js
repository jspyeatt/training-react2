class Person {
    // constructor function
    constructor(name = 'Anonymous', age = 0) {
        this.name = name;
        this.age = age;
    }
    getGreeting() {
        return `Hi, I am ${this.name}!`;   // This is a template string. With back-ticks.
    }
    getDescription() {
        return  `${this.name} is ${this.age} years old.`;
    }
}

class Student extends Person {
    constructor(name, age, major) {
        super(name, age);
        this.major = major;
    }
    hasMajor() {
        return !!this.major;       // Using double falsey, !!, to return true if there is a major.
    }
    getDescription() {
        let description = super.getDescription();
        if (this.hasMajor()) {
            description += ` Is a ${this.major} major.`
        }
        return description;
    }
}

class Traveler extends Person {
    constructor(name, age, homeLocation) {
        super(name, age);
        this.homeLocation = homeLocation;
    }
    getGreeting() {
        let greeting = super.getGreeting();
        if (this.homeLocation) {
            greeting += ` I'm from ${this.homeLocation}.`
        }
        return greeting;
    }
}

const me = new Person("John Pyeatt", 58);
console.log(me);
console.log(me.getGreeting());
console.log(me.getDescription());
// you don't have to specify the name argument
const other = new Student('John', 58, 'Meteorology');
console.log(other);
console.log(other.getDescription());

const traveler = new Traveler('Fred', 38, 'Denmark');
console.log(traveler.getGreeting());