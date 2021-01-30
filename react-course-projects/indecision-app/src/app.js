import React from 'react';
import ReactDOM from 'react-dom';
import IndecisionApp from './components/IndecisionApp';

const Layout = (props) => {
    return (
        <div>
            <p>header</p>
            {props.children}
            <p>footer</p>
        </div>
    );
}

ReactDOM.render((
    <Layout>
        <div>
            <h1>Page title</h1>
            <p>This is my page.</p>
        </div>
    </Layout>), document.getElementById('app'));

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