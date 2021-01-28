import React from 'react';
import ReactDOM from 'react-dom';
import IndecisionApp from './components/IndecisionApp';
ReactDOM.render(<IndecisionApp />, document.getElementById('app'));

class OldSyntax {
    constructor() {
        this.name = 'Mike';
        this.age = 58;
        this.getGreeting = this.getGreeting.bind(this);
    }
    getGreeting() {
        return `Hello, I'm ${this.name}.`;
    }
}
const oldSyntax = new OldSyntax();
console.log(oldSyntax);

// ----
class NewSyntax {
    name = 'Jen';
    age = 24;
    getGreeting = () => {
        return `Hello, I'm ${this.name}.`;
    };
}
const newSyntax = new NewSyntax();
console.log(newSyntax);