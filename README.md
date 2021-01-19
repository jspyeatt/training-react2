# Complete React Developer Course

## Section 2 - Setting up Environment

### Video 3 - Setting up your environment

### Video 4 - Installing Visual Studio

https://code.visualstudio.com

### Video 5 - Install Node.js and yarn

nodejs.org and yarnpkg.com

#### nodejs

node is javascript on the server. It is a web server and has tools such as webpack which we will use later.

Also includes `npm` node package manager. Allows you to install various dependencies such as `yarn` and `react`. npm and yarn do many similar things.

```bash
node -v  # lists the version
npm -v   # lists the version
```

#### yarn

Install yarn globally.

```bash
npm install -g yarn
yarn --version
```


## Section 3 - Hello React

### Video 6 - Hello React

Final versions of the indecision app at http://indecision.mead.io and source code http://links.mead.io/indecision. This section works mostly 
on JSX. JSX controls everything which renders to the screen.

### Video 7 - Setting up a web server

```bash
mkdir -p react-course-projects/indecision-app
cd react-course-projects/indecision-app
mkdir public           # contains all assets we want to serve
```
Create a basic index.html page in the public directory.

Now we are going to install liveserver. It's a light weight server. Live reload.

```bash
cd react-course-projects/indecision-app  # seems like you need to be in this directory to install.
yarn global add live-server  # ends up being installed in ${HOME}/.yarn/bin directory

npm install -g live-server  # THIS method may be needed if yarn didn't install correctly.

live-server -v   # prints the version

live-server public   # start the live server on port :8080 and serves the /public directory
```

### Video 8 - Hello React

Installing react

```html
  <body>
  <script src="https://unpkg.com/react@16.0.0/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@16.0.0/umd/react-dom.development.js"></script>
  <script src="/scripts/app.js"></script>
  </body>
```
The first package is the base of react.

The react-dom package is used for rendering html pages. There is also react-vr for virtual reality
and react-native for native applications.

Once you've saved everything live-server should serve up the page. The chrome debugger should
show the files being loaded. Open the console.

```bash
> React
> ReactDOM
```

#### JSX Javascript XML

JSX is an extension to Javascript

```javascript
var template = <p>This is JSX from app.js</p>; // what to render
var appRoot = document.getElementById('app'); // where to render it.

ReactDOM.render(template, appRoot);  // how it gets rendered.
```

This won't render immediately because the browser doesn't know what to do with the `template` variable. We
need to run something to compile it down into something the browser can actually understand.

We do the compilation by using [babel](https://babeljs.io). Used to compile ES6 and ES7 source code into ES5 which
is what browsers understand.

### Video 9 - Setting up Babel

[babel](https://babeljs.io) is a compiler. But we have to add plugins and presets. Presets are groups of plugins.  We need to include
the react preset. The docs plugins page will have the official presets. We need 2: `react` and `env` preset. This gives us access
to `es2015`, `es2016` and `es2017`.

```bash
cd indecision-app
yarn global add babel-cli@6.24.1

babel --help
```

Initialize the indecision app with yarn. We do this to start doing the packaging.

```bash
cd indecision-app
yarn init   # you will be prompted for some answers to questions

NAME: indecision-app
VERSION: 1.0.0
DESCRIPTION: Indecision App
ENTRY POINT: index.js
REPOSITORY URL: (Blank for now)
AUTHOR: John Pyeatt
LICENSE: MIT
```
This will create a `package.json` file.

```json
{
  "name": "indecision-app",
  "version": "1.0.0",
  "description": "Indecision App",
  "main": "index.js",
  "author": "John Pyeatt",
  "license": "MIT"
}
```

```bash
yarn add babel-preset-react@6.24.1 babel-preset-env@1.5.2
```
This will update package.json and also add the directory `node_modules` which just contains all the dependencies your project needs.
You never need to archive anything in `node_modules`. Those modules are pulled in based on the contents of package.json. If you blow
`node_modules` away, you can get everything back by calling `yarn install`.


```javascript
{
  "name": "indecision-app",
  "version": "1.0.0",
  "description": "Indecision App",
  "main": "index.js",
  "author": "John Pyeatt",
  "license": "MIT",
  "dependencies": {
    "babel-preset-env": "1.5.2",
    "babel-preset-react": "6.24.1"
  }
}

```

`yarn.lock` just lists out all dependencies and where it got them. You don't manually edit this.

Now we can use babel. 

Create a new folder in root of project `src`. And add the file app.js. This will be our source file. When it is compiled it will put 
the resulting, compiled version of the file in the public/scripts directory which is served by the web server.

```bash
babel src/app.js --out-file public/scripts/app.js --presets=env,react --watch
```
**Important** the `--watch` argument will watch our src/app.js file and regenerate public/scripts/app.js as we change and save 
our source file.

In another terminal window we will start live-server again.
```bash
live-server public
```


### Video 10 - Exploring JSX

More complicated JSX
```
var template = <h1>App.js is running</h1><p>This is some info</p>
```
This fails because you can only have one parent element in a jsx variable. So we need to
wrap this in something like a div tag.

```javascript
var template = <div><h1>App.js is running</h1><p>This is some info</p></div>;
```
or to make it clearer, wrap everything in a `(` and `)`.
```javascript
var template = (
    <div>
      <h1>App.js is running</h1>
      <p>This is some info</p>
    </div>);
```

### Video 11 - JSX Expressions

```javascript
var userName = 'John Pyeatt';
var age = 57;
var userLocation = 'Verona';
var template = (
    <div>
      <h1>{userName}</h1>
      <p>Age: {age}</p>
      <p>Location: {userLocation.toUpperCase()}</p>
    </div>);
```
What can you put in the `{}`? Any javascript expression.

You can also define objects and reference them as well. But remember, Objects are
not valid as a React child.

```javascript
var user = {name: "John", age: 57, location: 'Verona'}

var template = (
   <div>
      <h1>Name: {user.name}</h1>
   </div>
);
```

### Video 12 - Conditional Rendering in JSX

In between the `{}` of a JSX variable you can only put in javascript expressions. You
can't put in things like `if` statements. But function calls are expressions. So we can 
do that.

Here we are going to conditionally display the location tag.

```javascript
var user = {name: "John", age: 57, location: 'Verona'}

function getLocation(loc) {
   if (loc) {
      return loc;
   }
   return 'Unknown';
}

var template = {
   <div>
      <p>Name: {user.name}</p>
      <p>Location: {getLocation(user.location)}</p>
   </div>
};
```

Even better, we can conditionally display the entire Location paragraph.

```javascript
function getLocation(loc) {
   if (loc) {
      return <p>Location: {loc}</p>;
   }
   return 'Unknown';
}

var template = {
   <div>
      <p>Name: {user.name}</p>
      <p>Location: {getLocation(user.location)}</p>
   </div>
};
```

For JSX expressions which evaluate to `undefined`, `null` and boolean react renders nothing.

Here is another way to do conditionals using the ternary operator.

```javascript
<h1>{user.name ? user.name : 'Anonymous'}</h1>
```

Logical AND is another powerful tool.

```javascript
true && 'Some age'   // this returns 'Some age'
```
So if you use logical `and` and the first expression is truthy and the second value is
also truthy, `and` actually returns the value of the second part of the and. If the first
value is false, then the value returned by `and` is false and remember false is not
rendered by react. This is really useful.

 Here's an example of conditionally displaying the age
if they are over 18.
```javascript
{user.age >= 18 && <p>Age: {user.age}</p>}  // if the age > 18, render the paragraph, otherwise it does nothing.
```

Slightly safer expression is:
```javascript
{(user.age && user.age >= 18) && <p>Age: {user.age}</p>}
```

Morale of the conditionals. If you want to display a result or nothing, use logical `and`.
If you want to display something, or something else use ternary operator.


### Video 13 - ES6 Aside: const and let



To go over this we are going to create a second directory under source
called `playground`. And in there create the file es6-let-const.js

Then restart babel pointing at new file.

```bash
babel src/playground/es6-let-const.js --out-file public/scripts/app.js --presets=env,react --watch
```

`var` has quirks. this is perfectly legal.

```javascript
var nameVar = 'John';
var nameVar = 'Mike';  // I'm redefining it here.
```

`let` allows you to assign variables as much as you like, but you can't redefine them.

```javascript
let nameLet = 'John';
nameLet = 'Pyeatt';  // perfectly fine.
let nameLet = 'John';  // attempting to reassign nameLet, this will blow up in babel.
```

`const` can only be defined and assigned one time.
```javascript
const nameConst = 'John';
nameConst = 'Pyeatt';  // babel will fail
```

`var` is function scoped.

`let` and `const` are also function scoped and block scoped.

```javascript
var fullName = 'John Pyeatt';
if (fullName) {
    var firstName = fullName.split(' ')[0];
    const lastName = fullName.split(' ')[1];
    console.log('FirstName', firstName);
    console.log('LastName', lastName);
}
console.log('firstName', firstName);   // completely valid because var is not block-scoped.
console.log('lastName', lastName);     // not valid, const is block-scoped.
```


### Video 14 - ES6 Aside: Arrow functions

#### ES5 function
```javascript
function square(x) {
   return x * x;
}
console.log("square", square(4));
```

#### ES6 arrow function

```javascript
const squareArrow = (x) => {
  return x * x;
};
console.log("squareArrow", squareArrow(4));
```
You cannot just declare an arrow function like you can an es5 function. You must assign it to a variable.


Arrow function expression syntax if the function just returns a single expression. 
```javascript
const arrowExp = (x) => x * x;
console.log("squareExpr", squareArrow(4));
```

### Video 15 - ES6 Aside: Arrow functions part 2

Important differences between ES5 and ES6 functions.

The `arguments` object is no longer bound with arrow functions. The `this` keyword is no longer bound either.
#### arguments variable
```javascript
const add = function (a,b) {
  console.log(arguments);  // you have access to this in an es5 function definition.
  return a+b;
}
console.log("add", add(56,1));
```

You don't have access to `arguments` with arrow functions.
```javascript
const addArrow = (a,b) => {
  console.log("arrow add", arguments);  // this will fail because arrow functions can't access arguments.
  return a+b;
};
```
If you need to be able to do varargs stuff, you need to use es5 functions.

#### 'this' keyword

ES5
```javascript
const user = {
   name: 'John',
   cities: ['Madison', 'Verona', 'Memphis'],
   printPlacesLived: function() {
      console.log(this.name);
      console.log(this.cities);
      this.cities.forEach(function(city) {
         console.log(this.name, city);    // won't work because we don't have access to 'this' here.
      });
   }
};
```

So where you define a regular named function like `printPlacesLived` you have access to the `this` keyword
but if it is an unnamed function you don't.

Arrow functions within the object definition do have access however.
```javascript
const user = {
   name: 'John',
   cities: ['Madison', 'Verona', 'Memphis'],
   printPlacesLived: function() {
      console.log(this.name);
      console.log(this.cities);
      this.cities.forEach((city) => {
         console.log(this.name + city);   // works fine.
      });
   }
};
```

If you try to make printPlacesLived an arrow function (es6) like this.
```javascript
const user = {
   name: 'John',
   cities: ['Madison', 'Verona', 'Memphis'],
   printPlacesLived: () => {
      console.log(this.name);
      console.log(this.cities);
   }
};
```
The above will fail because arrow functions are not bound to their parent objects, so the `this` keyword is undefined.

#### es6 method definition syntax on objects.

Accessing the `this` object in cityMsgs will work below because it's within a named function.
```javascript
const user2 = {
    name: 'John',
    cities: ['London', 'Manchester', 'Liverpool'],
    printPlacesLived2() {
       const cityMsgs = this.cities.map((city) => {
          return this.name + ' LIVED ' + city;
       });
       return cityMsgs;
    }
 };
```

#### challenge

```javascript
 const multiplier = {
   numbers: [1, 5, 6],
   multiplyBy: 7,
   multiply() {
        return this.numbers.map((v) => v * this.multiplyBy)
   }
 };
 console.log(multiplier.multiply());
```

### Video 16 - Events and Attributes

We are going to add a counter to the screen.

```javascript
let count = 0;
const templateTwo = (
   <div>
      <h1>Count: {count}</h1>
      <button id="my-plus-button" className="button">+1</button>
   </div>
);
```
`id` is an attribute that is passed to the DOM for rendering. Another attribute commonly used is `class`.
But with `class` you will get an error Unknown DOM property, did you mean className? So `class` now needs
to be called `className` because class is a reserved html word.

babel converts template2 to an object. If you look at that object in the console you will see Object->props->children. And if you look at one of those children you will find another props object and in there you will
see the tag attributes such as `id` and `className`. For a complete list look at [React DOM Elements](https://reactjs.org/docs/dom-elements.html).

We can change the code a bit to implement an event listener.
```javascript
const buttonId = "my-plus-button";   // assign the button name
let count = 0;
const templateTwo = (
   <div>
      <h1>Count: {count}</h1>
      <button id={buttonId} className="button">+1</button>   // Use the const for the id=
   </div>
);
```
This is useful for setting up a click event.
```javascript
const addOne = () => {
   console.log("addOne clicked");
};
const templateTwo = (
   <div>
      <h1>Count: {count}</h1>
      <button onClick={addOne} id={buttonId}>+1</button>   // Defining onClick
   </div>
);
```
### Video 17 - Manual Data Binding
How to rerender when the count changes. JSX doesn't have built-in data binding. So the template is run at `ReactDOM.render() time. It doesn't detect changes to count.

So what we need to do is rerender when things change. We do that by moving the template into a function.
```javascript
const addOne = () => {
    count++;
    console.log("addOne " + count);
    renderCounterApp()                 // Now rerendering
};
const appRoot = document.getElementById("app");

// Now moved the template rendering to a function so we can call it after an onClick event.
const renderCounterApp = () => {
    const templateTwo = (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={addOne} id="add-button">+1</button>
            <button onClick={minusOne} id="sub-button">-1</button>
            <button onClick={resetCounter} id="reset-button">Reset</button>
        </div>
    );
    ReactDOM.render(templateTwo, appRoot);
};
renderCounterApp(); // this initializes the application.
```

The `renderCounterApp` redefines the template. Then ReactDOM.render() rerenders. But render() is very smart.
It keeps track of which parts of the template have actually changed and only rerenders those elements which
need to be changed.

### Video 18 - Forms and Inputs
Learn how to do something when the user submits a form. For this we are going to modify the options array.

Unlike server side processing, we don't want to send a request to the server. We want to add the options
values right on the client. So there are a few things we do differently.

```javascript
const onFormSubmit = (e) => {
    e.preventDefault(); // Stops the full page refresh and the submission to a server.
    const option = e.target.elements.optionButton.value;
    console.log('submitted:', option);

    // if a value was entered
    if (option) {
        app.options.push(option);   // add to options array.
        e.target.elements.optionButton.value = '';   // clear the form
        renderApp();
    }
};
const template = (
    <div>
        <h1>{app.title}</h1>
        {app.subtitle && <p>{app.subtitle}</p>}
        <p>{(app.options && app.options.length > 0) ? 'Here are your options' : 'No options'}</p>
        <p>{app.options.length}</p>
        <form onSubmit={onFormSubmit}>
        <input type="text" name="optionButton"/>
        <button>Add Option</button>
        </form>
    </div>);
```
We need to add an event handler to the submit button. For a complete list of the react events you need
to look at [Supported Events](https://reactjs.org/docs/events.html). We want `onSubmit` which identifies
the event handler to run when the submit on the form is done.

Note that in the onSubmit= we reference `onFormSubmit` by just identifying it. We don't actually call
it by putting in `onFormSubmit()`. If we did that it would just render as undefined.


### Video 19 - Arrays in JSX
React works with strings, numbers and arrays. It doesn't work with objects and booleans. So arrays are fine.
When jsx sees an array it renders them one after another.
```javascript
{
   [99, 98, 97, true, undefined, false, 'Mike']   // renders as 999897Mike
}
```
When using arrays to render jsx like this.
```javascript
{
   [<p>One</p>,<p>two</p>]
}
```
If you render it you will see a warning: Each chile in an array or iterator should have a unique key prop.
This is needed for react to continue to only modify the dom for elements which actually change.

```javascript
{
   [<p key="one">One</p>,<p key="two">two</p>]    // warning goes away. jsx can now optimize.
}
```
Normally you use the array `map()` function to iterate over an array and build JSX templates.
```javascript
const numbers = [55, 101, 1000];
{
   numbers.map((v) => {return <p key={v}>{v}</p>;})
}
```

### Video 20 - Picking an Option
We are going to conditionally allow a user to ask what to do. This will just pop up an alert when
the button is selected. but we want the button disabled if no options are available.
```javascript
const onMakeDecision = () => {
    const randomNum = Math.floor(Math.random() * app.options.length);
    console.log('Random',randomNum);
    const selectedOption = app.options[randomNum];
    alert(selectedOption);
};

<button disabled={app.options.length == 0} onClick={onMakeDecision}>What should I do?</button>
```

### Video 21 - Build it: Visibility Toggle

Write a new app, build-it-visible.js with a Show/Hide details button. When you click the button it alternates
showing and hiding some text.


## Section 4 - React Components

### Video 23 - Thinking In React

You want to break pages into logical, reusable components. It's usually an individual piece of the UI.
Maybe a header, a footer, or a menu.

You end up basically creating custom html components such as `<Header/>`.

For each page, you create a parent tag and then add the components.

So for indecision app we might have:

1. Parent component - `<IndecisionApp/>`
1. `<Header/>`
1. Question title - `<Action/>`
1. Options `<Options/>`
1. `<Option/>` - reusable and nested in `<Options/>`
1. Add Option form. - `<AddOption/>`

### Video 24 - ES6 Classes: Part 1

The goal of classes is to reuse code.
```javascript
class Person {
    // constructor function
    constructor(name) {
        this.name = name;
    }
}

const me = new Person("John Pyeatt");
```

You don't have to specify all the arguments in a constructor. You can configure the constructor
to provide defaults.
```javascript
class Person {
    // constructor function
    constructor(name = 'Anonymous') {   // provides a default
        this.name = name;
    }
}
```
Now you can create methods.
```javascript
class Person {
    // constructor function
    constructor(name = 'Anonymous') {
        this.name = name;
    }

    getGreeting() {
       return "Hi I am " + this.name;
    }
}
```

#### ES6 Template Strings
You use back-ticks 
```javascript
return `Hi, I am ${this.name}!`
```

### Video 25 - ES6 Classes: Part 2

Extending a class.
```javascript
class Person {
    // constructor function
    constructor(name = 'Anonymous', age = 0) {
        this.name = name;
        this.age = age;
    }
    getGreeting() {
       return "Hi I am " + this.name;
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
```
### Video 26 - Creating a React Component
First thing. We are going to redo the app.js as a series of react components. I moved the existing app.js
to playground/jsx-indecision.js to save the old version.

Simplest react component, Header.
```javascript
class Header extends React.Component {    // WARNING: React requires component classes to begin with upper case.
    render() {
        return <p>This is from HEADER</p>;
    }
}

const jsx = (
    <div>
        <h1>Title</h1>
        <Header/>             // our custom react header.
    </div>
)
ReactDOM.render(jsx, document.getElementById('app'));
```

### Video 27 - Nesting Components
The example in the previous video was just showing how to create components. In the real world, they
should be organized a bit differently. We want one component to be the overarching component for the
entire application. So we are going to create `<IndecisionApp/>` component and put all the other 
components inside of that one.

```javascript
class IndecisionApp extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <Action/>
                <Options/>
                <AddOption/>
            </div>
        )
    }
}

// Then to render
ReactDOM.render(<IndecisionApp/>, document.getElementById('app'));
```

### Video 28 - Component Props
Going to add attributes to the tags.

```html
<Header title='This is a custom title'/>
```
So we have to add logic to reference `title`. In the `this` object of your component there is a `props`
attribute which will have any attributes you've placed in the tag.

```javascript
class Header extends React.Component {
    render() {
        return (
            <div>
            <h1>{this.props.title}</h1>  // reference to id=title from <Header/> tag.
            <h2>Put your life in the hands of a computer.</h2>
            </div>);
    }
}
```
For a first pass we want to render the list of options in the `<Options/>` tag. This isn't the final way
we are going to do it. I'm just showing one option.
```javascript
class Options extends React.Component {
    render() {
        return (
            <div>
                <h2>Options here length={this.props.options.length}</h2>
                <ol>
                {
                    this.props.options.map((opt) => <li key={opt}>{opt}</li>) // map loops through options array
                }
                </ol>
            </div>
        )
    }
}
```
The cleaner solution is to add an attribute to `<Option/>` tag.
```javascript
class Options extends React.Component {
    render() {
        return (
            <div>
                <h2>Options</h2>
                <ol>
                {
                    this.props.options.map((option) => <Option key={option} optionText={option}/>)  // nested Option tag
                }
                </ol>
            </div>
        )
    }
}
class Option extends React.Component {
    render() {
        const v = this.props.optionText;
        return (
            <li>{v}</li>  // just renders the attribute passed in.
        )
    }
}
```

### Video 29 - Events & Methods
To handle events you need to do two things. Define the methods which are to react to the events and
reference those methods when the event is clicked. So we have to bind the method to the event.

You define the handling methods within the class of the react component, for example, `handlePick()` below.
Then bind the method to the event in the `onClick` event described for the button.

```javascript
class Action extends React.Component {
    handlePick() {
        console.log('handlePick');
    }
    render() {
        return (
            <div>
                <button onClick={this.handlePick}>What should I do?</button>
            </div>
        )
    }
}
```
Here's our form submission example with the `onSubmit` event.
```javascript
class AddOption extends React.Component {
    handleAddOption(e) {
        e.preventDefault();     // doesn't send data to server.
        const option = e.target.elements.optionButton.value.trim();
        if (option) {
            console.log('adding option', option);
        }
        e.target.elements.optionButton.value = '';
    }
    render() {
        return (
            <form onSubmit={this.handleAddOption}>
                <input type='text' name="optionButton" />
                <button>Add Option</button>
            </form>
        )
    }
}
```

### Video 30 - Method Binding

### Video 31 - What is Component State?

### Video 32 - Adding State to Counter App: Part 1

### Video 33 - Adding State to Counter App: Part 2

### Video 34 - Alternate setState Syntax

### Video 35 - Build It: Adding State to Visibility Toggle

### Video 36 - Indecision State: Part 1

### Video 37 - Indecision State: Part 2

### Video 38 - Summary: Props vs. State
