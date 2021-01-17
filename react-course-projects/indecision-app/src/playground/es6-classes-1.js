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

const me = new Person("John Pyeatt", 58);
console.log(me);
console.log(me.getGreeting());
console.log(me.getDescription());
// you don't have to specify the name argument
const other = new Person();
console.log(other);
