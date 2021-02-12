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
In the code below we've broken the reference to `this` in handlePick() when it is referenced
in the `onClick={this.handlePick}` definition. It's a bit weird, but in the onClick we've referenced
the method, but it's done outside the context of the object as a whole. The context includes the
method only. So in `handlePick()` we don't have access to `this`.

**Important** You always lose the context in event handlers. So you need to use [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind).

```javascript
class Options extends React.Component {
    handleRemoveAll() {
        console.log('Remove all',this.props.options);
    }
    render() {
        return (
            <div>
                <h2>Options</h2>
                <button onClick={this.handleRemoveAll}>Remove All</button>
                <ol>
                    {
                        this.props.options.map((option) => <Option key={option} optionText={option} />)
                    }
                </ol>
            </div>
        )
    }
}
```

So we need to figure out how to bind everything together. We use the `bind()` method. Here's a simple example.
```javascript
const obj = {
	name: 'John',
	getName() {
		return this.name;
	}
};
const func1 = obj.getName();   // this will fail because I've lost the context. Basically func1 is
                               // just getting a reference to the object's function, without the rest of
                               // the obj data.
const func2 = obj.getName.bind(obj);  // this will work, because we are binding the object to the object's
                                      // getName() method.
```

So in our example above we add a bind() call to the onClick.
```javascript
<button onClick={this.handleRemoveAll.bind(this)}>Remove All</button>
```
But this mechanism is a bit inefficient. So the alternative thing to do is override the constructor. Then
we don't have to re-`bind()` every time things are rendered. So the onClick doesn't actually call bind.
This is the preferred way.

```javascript
class Options extends React.Component {
    constructor(props) {
        super(props);         // MAKE CERTAIN TO CALL PARENT CONSTRUCTOR
        this.handleRemoveAll = this.handleRemoveAll.bind(this);  // PERFORM THE BIND HERE.
    }
    handleRemoveAll() {
        console.log('Remove all',this.props.options);
    }
    render() {
        return (
            <div>
                <h2>Options</h2>
                <button onClick={this.handleRemoveAll}>Remove All</button>  <!-- NOTE: no bind() call needed here -->
                <ol>
                    {
                        this.props.options.map((option) => <Option key={option} optionText={option} />)
                    }
                </ol>
            </div>
        )
    }
}
```

### Video 31 - What is Component State?

Allows our components to manage data. When the data changes, the component will automatically re-render.

Component's must have a default state. Then it is rendered automatically without calling render().

### Video 32 - Adding State to Counter App: Part 1
We are going to start with the simple Counter application redone as components.
```javascript
class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOne = this.handleAddOne.bind(this);
        this.handleMinusOne = this.handleMinusOne.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }
    handleAddOne() {
        console.log("handleAddOne");
    }
    handleMinusOne() {
        console.log("handleMinusOne");
    }
    handleReset() {
        console.log("handleReset");
    }
    render() {
        return (
            <div>
            <h1>Count: </h1>
            <button onClick={this.handleAddOne}>+1</button>
            <button onClick={this.handleMinusOne}>-1</button>
            <button onClick={this.handleReset}>reset</button>
            </div>
        )
    }
}
```

### Video 33 - Adding State to Counter App: Part 2

To add state we need to set a default and store it in the class.
You add an attribute to the class like this:
```javascript
this.state = {
   count: 0
}
```

Accessing the value of our state in the component is easy. It's going to look something like this:
```html
<h1>Count: {this.state.count}</h1>
```

When you want to manipulate the state values of a component you don't want to just change the values like
this:
```javascript
    handleAddOne() {
        console.log("handleAddOne");
        this.state.count = this.state.count + 1
    }
```
Because that won't rerender the component. To make modifications to the state and have it automatically re-rendered
you need to call `this.setState()` as follows:
```javascript
    handleAddOne() {
        console.log("handleAddOne");
        this.setState((prevState) => {          // calling setState with an arrow function and passing in the previous state.
            return {
                count: prevState.count + 1
            };
        });
    }
```
Now when setState() is called it will update the instance state data and call render() on its own. The one nice
thing is that if your component has more than one state value, for example if the initial state looked like this:
```javascript
this.state = {
   count: 0,
   name: "my counter"
}
```
When you call this.setState() if you only are changing the value of `count` for example you can just have your
setState call look like this:
```javascript
        this.setState((prevState) => {.
            return {
                count: prevState.count + 1
            };
        });
```
this.state.name will remain unchanged.

### Video 34 - Alternate setState Syntax
Here is an older syntax for updating the state that shouldn't be used, but you may see. 

```javascript
    handleReset() {
        console.log("handleReset");
        this.setState({
          count: 0
        });
        this.setState({
          count: this.state.count + 1
        });
    }
```
Notice there are two setState methods. If you hit reset you would expect the count to end up being 1 because
first it resets to 0, then it adds 1. But that doesn't happen because these methods are executed async. So you
can't predict the order. So it's best to do the arrow function signature.

### Video 35 - Build It: Adding State to Visibility Toggle
We are going to redo the visibility toggle app as components. So we are changing playground/build-it-visibile.js

### Video 36 - Indecision State: Part 1
In this section we are going to add options as state to the indecision app.

```javascript
class IndecisionApp extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            options: ['One', 'Two', 'Three']
        }
    }
```

The trick is how to manipulate options. And we have to do it in children of `<IndecisionApp/>`. `<AddOption/>`, the child
needs to be able to manipulate the state of the parent `<IndecisionApp/>`. options. `<Options/>` also needs to be able to
manipulate the options in state. Passing state from parent to child is easy.

So to pass information from child to parent we need to pass functions in as props to the child components.

It basically takes four steps:

1. define a method in the parent class to perform the desired operation. In this case, `handleDeleteOptions()`.
1. bind the method to the class in the constructor `this.handleDeleteOptions = this.handleDeleteOptions.bind(this);`
1. pass a reference to the new method in the `<Options handleDelete={this.handleDeleteOptions}/>` tag
1. reference the `this.props.handleDelete` in the `onClick` associated with the Remove all button.

```javascript
class IndecisionApp extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            options: ['One', 'Two', 'Three']
        }
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);        // *** Binding the new method to the instance
    }

    // we define this method in the parent component, but
    // we pass it into the child component <Options> so it
    // can be called during Remove All.
    handleDeleteOptions() {                                                   // *** The new method to clear out the options.
        console.log("handleDeleteOptions");
        this.setState(() => {
            return {
                options: []
            };
        });
    }
    render() {
        const title = 'Indecision App';
        const subtitle = 'Put your life in the hands of a computer.';
        return (
            <div>
                <Header title={title} subtitle={subtitle} />
                <Action hasOptions={this.state.options.length > 0} />
                <Options 
                options={this.state.options}
                handleDelete={this.handleDeleteOptions}                      // *** pass the new method reference, this.handleDeleteOptions as a propertty
                />
                <AddOption />
            </div>
        )
    }
}


class Options extends React.Component {
    render() {
        return (
            <div>
                <h2>Options</h2>
                <button onClick={this.props.handleDelete}>Remove All</button>         // *** add a reference to the new Options property to the onClck
                <ol>
                    {
                        this.props.options.map((option) => <Option key={option} optionText={option} />)
                    }
                </ol>
            </div>
        )
    }
}
```

### Video 37 - Indecision State: Part 2

In the previous video we passed a function down to a child component so that function could be called onClick to delete options.
In this video we are going to do basically the same thing, except this time we are actually going to pass data up to the parent
when we call the parent method.

So in `<IndecisionApp/>` we add the method handleAddOption(option) which receives the new value. Then we add a property to the `<AddOption/>`
tag and that property contains a reference to this.handleAddOption. So that is basically like the previous video.

It's in the definition of the AddOption component itself where things get a little busier. Here's the final version of AddOption component.
Explanations are in the comments to the class. This snippet is just showing the parts of the classes which changed.


The IndecisionApp component's handleAddOption() method.
```javascript
    handleAddOption(option) {
        console.log("IndecisionApp: handleAddOption " + option);

        // In this case we are going to return an error string if
        // they didn't enter anything or in the else, if there is a 
        // duplicate. 
        // the normal behavior for this method would be to return undefined.
        // if a string is returned, there must be an error.
        if (!option) {
            return 'Error valid value!!';
        } else if (this.state.options.indexOf(option) > -1) {
            return 'The value ' + option + ' already exists.';
        }

        // set the new state.
        this.setState((prevState) => {
            return {
                options: prevState.options.concat(option)
            }
        });
        // returns undefined.
    }
```
In the render() method of IndecisionApp component we add the handleAddOption property to `<AddOption>` and reference the handleAddOptionProperty.
```html
<AddOption handleAddOption={this.handleAddOption} />
```
Then in the `<AddOption>` component we do the following:

1. we are keeping handleAddOptionChild(e) in this component because it does more than just pass an option value. It now manages the state
of the error field and still suppresses form submission with the e.preventDefault() ca..
1. because we need to manage the error state of the AddOption component we need to add this.state to the constructor and need to bind this
component's version of handleAddOptionChild.
1. We've added error message rendering. We do this by checking for a return value from this.props.handleAddOption(e). if the return is
undefined, there was no error. If there is something returned. We need to update the state of the AddOption state.error value.
1. Then we added conditional rendering of an error message `<p>` tag if this.state.error is not empty.

```javascript
class AddOption extends React.Component {

    // Need to setup the constructor because we need to bind handleAddOption.
    constructor(props) {
        super(props);
        this.handleAddOptionChild = this.handleAddOptionChild.bind(this);
        this.state = {
            error: undefined
        }
    }
    /*
     * we keep this handleAddOption method because there are still things
     * we really should do in the AddOption component. Specifically we
     * disable the form submission with e.preventDefault() and we pluck
     * the new value from the e.target.elements.optionButton.value so we
     * can pass that value up to the parent method.
     */
    handleAddOptionChild(e) {
        e.preventDefault();
        const option = e.target.elements.optionButton.value.trim();

        const errMsg = this.props.handleAddOption(option);  // CALLS the parent method, passing in the new value.
        this.setState(() => {
            return {
                error: errMsg
            }
        });
        e.target.elements.optionButton.value = '';
    }
    render() {
        return (
            <div>
            {this.state.error && <p>{this.state.error}</p>}
            <form onSubmit={this.handleAddOptionChild}>
                <input type='text' name="optionButton" />
                <button>Add Option</button>
            </form>
            </div>
        )
    }
}
```
### Video 38 - Summary: Props vs. State

1. Props
   . An object
   . Can be used when rendering
   . Changes (from above), cause re-rendering
   . Come from above
   . Can't be changed by component itself
1. State
   . An object
   . Can be used when rendering
   . Changes cause re-rendering
   . Defined in component itself
   . Can be changed by the owner of the state.

## Section 5 - Stateless Functional Components

### Video 39 - Section Intro: Stateless Functional Component

### Video 40 - Stateless Functional Component
This is an alternative to class-based components. It doesn't allow state.

In the indecision app some of the components manage state. We are going to switch out some
of the components which don't. For example, `<Header/>` doesn't do anything other than render
what was passed in. Theses types of components are presentation only. They may call other functions
on `onClick`, but they don't care what happens when that occurs.

In stateless components you are really just defining a function which knows how to render. It only
renders what is passed to it.

```javascript
// first stateless component. Note it's upper case.
const User = () => {
    return (
        <div>
            <p>Name: {props.name}</p>
            <p>Age: {props.age}</p>
        </div>
    )
}
ReactDOM.render(<User name='John' age={58}/>, document.getElementById('app'));
```
This render() call works because jsx assumes that if you are passing in a lower case tag it must be html.
But if you are passing in an upper case value, `<User/>`, it must be a component.

Stateless components are much faster to render. They are easier to write. And they are easier to test.

The general rule is that if your class component only has a render() method it can probably be converted
to a stateless functional component.

Converting a class component to a stateless functional component is pretty easy.

1. create const with same name as class component had
1. take the contents of the class's `render()` method and make it the inside of the new function created in step 1.

This class component
```javascript
class Action extends React.Component {

    render() {
        return (
            <div>
                <button
                    onClick={this.props.handlePick}
                    disabled={!this.props.hasOptions}>
                    What should I do?
                </button>
            </div>
        )
    }
}
```
becomes this stateless functional component. The only thing you really need to remember is there is no `this` in a functional component.
```javascript
const Action = (props) => {
    return (
        <div>
            <button
                onClick={props.handlePick}    // just remove the this.
                disabled={!props.hasOptions}> // just remove the this.
                What should I do?
            </button>
        </div>
    )
}
```

### Video 41 - Default Prop Values
How to handle defaults if a prop isn't passed in.

We are going to set a default for title in `<Header/>` and no default for subtitle.

We do this by adding values to the property `defaultProps` to the component definition.
```javascript
const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}   // conditionally render only if passed in.
        </div>);
};
Header.defaultProps = {
    title: 'Indecision'
};
```
We can do this for class components as well.
```javascript
IndecisionApp.defaultProps {
   options: []   // initialize our options list to empty
}
Then in the definition of the constructor for `IndecisionApp` itself you would do this.
```javascript
constructor(props) {
   this.state = {
       options: props.options  // props.options is actually defaultProps when no properties are passed in to the jsx tag.
   }
}
```
So now if I wanted I could pass the options I want to start with in the `<IndecisionApp options={['Starting option']}/>'


### Video 42 - React Dev Tools
You can install a react extension for Chrome or Firefox. When you open the dev tools you will see a new
tab called '@Components'. Clicking on that tab opens the tool and you can see the actual react components
and where they are registered on the screen.

One subtle thing available via the dev tool is when you highlight a component in the Component tab you
have access to a special global variable `$r`. So when you highlight a component you can go to the
console and enter `$r` and display the entire contents of that component.

### Video 43 - Removing Individual Options
First we are going to do the shorthand of the arrow function which deletes all the options in the
indecision app.

original javascript
```javascript
handleDeleteOptions() {
console.log("handleDeleteOptions");
this.setState(() => {
    return {
        options: []
    };
});
}
```
becomes
```javascript
handleDeleteOptions() {
console.log("handleDeleteOptions");
this.setState(() => ({options: []}));
}
```
We can do the above because we've changed setState to return an object `{options:[]}`. This isn't an
earth-shattering change, but it does require less lines of code.

Now we are going to add remove button to each item option.
```javascript
handleDeleteOption(option) {
   console.log("handleDeleteOption", option);
}
```

New method responsible for taking in option and removing it. The trick is that IndecisionApp, which
owns the options array, doesn't have direct access to the `<Option>` tag. We do have direct access
to the `<Options>` tag. So we are going to pass the new method through two levels of chaining. First
to `<Options>` then to `<Option>`.

The new version of Option starts to look like this:
```javascript
const Option = (props) => {
    return (
        <div>{props.optionText}
        <button onClick={props.handleDeleteOption}>remove</button>
        </div>
    )
}
```
This won't work right away because we aren't passing in the optionText to the handleDeleteOption() method
as it needs. We are passing the event object instead. So we need to change this to pass the optionText.
We create an inline arrow function for onClick.
```javascript
const Option = (props) => {
    return (
        <div>{props.optionText}
        <button 
        onClick={(e) => {                                // inline an event handling version of onClick
            props.handleDeleteOption(props.optionText)   // passing in the optionText.
        }}
        >
        remove
        </button>
        </div>
    )
}
```
Now we go back into handleDeleteOption for IndecisionApp and use the `filter()` function
to remove the specific array element.
```javascript
handleDeleteOption(optionToRemove) {
	console.log("handleDeleteOption", optionToRemove);
	this.setState((prevState) => ({
	    options: prevState.options.filter((option) => {
		return optionToRemove != option;
	    })
	}));
}
```

### Video 44 - Lifecycle Methods
[Lifecycle methods](https://reactjs.org/docs/react-component.html#the-component-lifecycle) fire when a **class component** changes. When it:
1. component renders
1. component is removed `componentWillUnmount()`
1. component changes `componentDidUpdate()`
1. component gets mounted to the DOM. `componentDidMount()`

The lifecycle methods largely fall into three categories: Mounting, unmounting and updating.

```javascript
componentDidUpdate(prevProps, prevState) {
   console.log("componentDidUpdate");
}
```
In the next video we will actually save and fetch data from local storage and use `compoentDidMount()`
to fetch and `componentDidUpdate()` to save data.

### Video 45 - Saving and Loading Options Data
We are going to save and update the options to local storage so they are available when the user comes
back.

#### Basics of Local storage
Local storage is just a key/value pair which persists between page loads.
```javascript
localStorage.setItem('name', 'John');
localStorage.getItem('name');
localStorage.removeItem('name');
```
 But it only persists string data. So how do we store objects. We use JSON.
```javascript
localStorage.setItem('options', JSON.stringify({'name': 'John', age: 58}));
JSON.parse(localStorage.getItem('options'));
```

Now let's save some data in indecision app.
```javascript
componentDidUpdate(prevProps, prevState) {
	console.log("componentDidUpdate");
	// we don't want to save data if the options array is already empty.
	if (prevState.options.length != this.state.options.length) {
	    const json = JSON.stringify(this.state.options);
	    console.log("save data", json);
	    localStorage.setItem('options', json);
	}
}
```
And let's recover the data when the app is loaded
```javascript
componentDidMount(prevProps, prevState) {
	const json = localStorage.getItem('options');
	if (json) {
	    try {
		const options = JSON.parse(json);
		console.log("componentDidMount", options);
		this.setState((prevState) => ({ options: options }))
	    } catch (e) {
		console.error("Bad data", e);
	    }
	}
}
```

### Video 46 - Saving and Loading the Count
We are going to use localStorage for the counter app. But we count in numbers, but localStorage
is in strings.
```javascript
let n = '12';
parseInt(n, 10);   // converts string to int
parseInt('abc', 10);  // returns NaN
isNaN(parseInt('abc', 10));   // returns true
```
So we need to be defensive about parsing the integer.

```javascript

componentDidMount(prevProps, prevState) {

	const json = localStorage.getItem('count');
	if (json) {
	    const newValue = parseInt(json, 10);
	    if (!isNaN(newValue)) {
		this.setState(() => {
		    return { count: newValue };
		});
	    }
	}
}
componentDidUpdate(prevProps, prevState) {
	console.log("componentDidUpdate");
	if (prevState.count != this.state.count) {
	    localStorage.setItem('count', this.state.count);
	}
}
```
## Section 6 - Webpack

### Video 47 - Section Intro: Webpack
Webpack is an asset bundler. Combines all of the assets from our application with all of the third party libraries our app needs.

1. allows us to take advantage of 3rd party libraries
1. break our own app into mulitple files. Each component is in its own file.

### Video 48 - What is Webpack?

Allows us to organize our javascript source. webpack will bundle that into one .js file. So we will only ever have to have one `<script>` tags.

`gulp` and `grunt` are other app bundling tools. webpack does it different. Webpack breaks up all of our files into separate sections which are then
referenced with es6.

We will also be able to install dependencies via yarn and npm using webpack.

Directory structure

1. public/ - public static assets like images and css
1. src/ - our javascript
1. node_modules/ - third party javascript

When webpack runs it will create public/bundle.js which contains everything javascript.

### Video 49 - Avoid global modules

Generally a bad idea to install global modules. We've installed two globals, babel-cli and live-server.

Problem 1 with global modules: our package.json file doesn't have a reference to babel or live-server for our project. So technically you don't know what the dependencies are.

Problem 2: We've installed it globally, so any other applications you may be writing would need to use the same versions.

Problem 3: You have to type in the entire command in your terminal each time. It would be nice if you had an alias.

Removing our global modules and reinstalling them as local modules.

```bash
yarn global remove babel-cli live-server
```
or
```bash
npm uninstall -g babel-cli live-server
```

Then
```bash
yarn add live-server babel-cli@6.24.1
```
Now instead of installing globally, they end up in the `node_modules` directory and they are referenced in package.json. But now those commands are not available on the
command line. So we need to add them as script aliases in package.json.

We add a `scripts` object to package.json with a keyword and the command to run.

```javascript
{
  "name": "indecision-app",
  "version": "1.0.0",
  "description": "Indecision App",
  "main": "index.js",
  "author": "John Pyeatt",
  "license": "MIT",
  "scripts" : {
    "serve": "live-server public/",
    "build": "babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch"
  },
  "dependencies": {
    "babel-cli": "6.24.1",
    "babel-preset-env": "1.5.2",
    "babel-preset-react": "6.24.1",
    "live-server": "^1.2.1"
  }
}
```
```bash
yarn run serve   # runs the script aliased as  serve
yarn run build   # runs the script aliased as  build
```


### Video 50 - Installing and Configuring Webpack

```bash
yarn add webpac@3.1.0  # installs webpack locally.
```
Next we are going to add a new script for webpack to package.json and rename our existing babel script.
```javascript
{
  "name": "indecision-app",
  "version": "1.0.0",
  "description": "Indecision App",
  "main": "index.js",
  "author": "John Pyeatt",
  "license": "MIT",
  "scripts": {
    "serve": "live-server public/",
    "build": "webpack --watch",
    "build-babel": "babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch"
  },
  "dependencies": {
    "babel-cli": "6.24.1",
    "babel-preset-env": "1.5.2",
    "babel-preset-react": "6.24.1",
    "live-server": "^1.2.1",
    "webpack": "3.1.0"
  }
}
```
Notice the build script just contains the command `webpack`. The reason for this is we are going to control
the configuration of webpack in a separate configuration file `webpack.config.js`. This is because webpack has a lot more knobs.

webpack.config.js is actually a node script. We are going to be using a bit of node. We have to let [webpack](https://webpack.js.org/concepts/) know
where the entry point is and the output destination. This definition of module.exports allows us to expose this module
to another file.

** warning ** for this video our indecision app.js file has temporarily been moved to /playground.

```javascript
const path = require('path');  // load the node module, path
module.exports = {
    entry: './src/app.js',       // source of your application
    output: {                    // destination files generated by webpack.
        path: path.join(__dirname, 'public'),   
        filename: 'bundle.js'
    }
};
```

Now because we are bundling with webpack we can clean out a few things a bit.

1. remove the scripts/app.js file and directory
1. modify our index.html page.

```html
  <body>
    <div id="app"></div>
  <script src="https://unpkg.com/react@16.0.0/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@16.0.0/umd/react-dom.development.js"></script>
  <script src="/scripts/app.js"></script>
  </body>
```
becomes
```html
  <body>
    <div id="app"></div>
  <script src="/bundle.js"></script>
  </body>
```


### Video 51 - ES6 import/export

Used to break up the app into multiple files.

Two parts to it. Load files you wrote and load third party files.

We are going to create our own additional file, utils.js. It's not picked up by default, because it isn't the entry point to the app.
What we need to do is bring it into the application. So we import it into app.js

app.js
```javascript
import './utils.js'
```
When you look at the output of `yarn run build` you will see that it now pulls in utils.js
```bash
Time: 33ms
    Asset     Size  Chunks             Chunk Names
bundle.js  2.94 kB       0  [emitted]  main
   [0] ./src/app.js 47 bytes {0} [built]
   [1] ./src/utils.js 35 bytes {0} [built]

```

Create a function in utils.js
```javascript
console.log("utils.js is running");

const square = (x) => {x * x};
```
Then in app.js we add
```javascript
import './utils.js';
console.log("RUNNING!!!");
console.log("square=", square(4));
```
When you run this it will thrown an error saying `square` doesn't exist. That's because the variables defined in utils.js are locally-scoped.

So we need to export square from utils.js. You can export either named, or default exports.

Here is how you define a named export.
```javascript

export {
    square, add
}
```
Alternatively, here is the exact same exports but we do them individually during the function definition.
```javascript
console.log("utils.js is running");

export const square = (x) => x * x;
export const add = (a,b) => a+b;
```

Finally you have to import it into app.js
```javascript
import { square, add } from './utils.js';

console.log("RUNNING!!!");
console.log(square(4));
console.log(add(4, 3));
```


### Video 52 - Default exports
With default exports, you can only define one. So we are going to define `subtract` as a default export.

```javascript
const square = (x) => x * x;
const add = (a,b) => a+b;
const subtract = (a,b) => a-b;

export {square, add, subtract as default}
```

We can't add subtract to the list of named exports in our app.js because subtract isn't a named export.
```javascript
import subtract, { square, add } from './utils.js';  // note the subtract is before the named exports.
console.log(square(4));
console.log(add(4, 3));
console.log(subtract(4, 3));
```

Default export is special, if you specify an argument after the `import` you can name it anything you want, it will
still import the function subtract, just with a different name. So for example, this is fine.
```javascript
import anythingYouWant, { square, add } from './utils.js';
console.log(square(4));
console.log(add(4, 3));
console.log(anythingYouWant(4, 3));  // basically an alias for subtract.
```

There is an alternative way to set up the export of the default.
```javascript
const subtract = (a,b) => a-b;
export default subtract;       // this declaration must be after the definition itself.
```

### Video 53 - Importing npm modules
We are going to import the npm module, validator. There are three steps.

Install - Google `npm validator`. Says how to install it `yarn add validator@8.0.0`.
Import - the trick is to figure out what the validator module exports and thus makes available to you.


```javascript
import validator from 'validator';  // note we don't specify a relative file path like we do for our own modules. Webpack will find it.
                                    // in this case we are also just importing the default (validator).

const em = 'jspyeatt@gmail.com';
console.log(em, validator.isEmail(em));
```
So now we are going to import react.
```bash
yarn add react@16.0.0 react-dom@16.0.0
```
```javascript
import React from 'react';
import ReactDOM from 'react-dom';

const template = <p>testing</p>;
ReactDOM.render(template, document.getElementById('app'));
```
The above will actually fail to load because we are no longer using babel to load our jsx. To get this working we need to get jsx processed
with webpack. That's the next video.

### Video 54 - Setting up babel with webpack
We need to implement a loader. A loader tells webpack how to process a given file.
```bash
yarn add babel-core@6.25.0  # allows you to run babel inside of tools
yarn add babel-loader@7.1.1

Now we need to do more advanced definitions in [webpack modules](https://webpack.js.org/concepts/modules/). We are going to define module.rules
to tell it what pattern of file names to process.

```javascript
module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',       // what loader to use
            test: /\.js$/,                // what filename patterns to match
            exclude: /node_modules/       // what directories to exclude
        }]
    }
};
```
Babel does nothing by default and we have to tell it to use presets for env and react. So to do that we create a file called `.babelrc` in the root
with the following contents.

```javascript
{
    "presets": ["env", "react"]
}
```
If everything is successful, the busted version of `app.js` at the end of the previous video should now work.

### Video 55 - One Component Per File
Going to take all of app.js and break it out into files.

Create a `components` directory off of `src`. 

When you create a file for a component you normally give it the same name as the compoent including the case. This isn't required,
but it is a good rule.

So you move the entire component class into the new file (components/AddOption.js). But that isn't enough. We still need to import
React and also export the component so other files can reference it.

```javascript
import React from 'react';  // rignt at the top of the file.

export default class AddOption extends React.Component {
 // commented out the rest for brevity
}
```
Then in the indecision app we would import it.
```javascript
import AddOption from './components/AddOption';  // don't have to include the .js
```
So AddOption is a class component. `<Option>` is a stateless function and has to be exported differently because you can't export
it inline like you can for class components. So after Option has been moved to its own file you need to do it one of two ways:
```javascript
import React from 'react';

export default const Option = (props) => {} // won't work 

// option 1

// leave the original definition alone.
const Option = (props) => {}
// then at the bottom

export default as Option;

// option 2
export default (props) {}  // but this has an implication. The problem is that if you use the react developer tool to open up the components
                           // instead of seeing the component name Option. You will just see Unknown. So, less helpful.

```
So option 1 is preferred.

The `<Options>` component needs a little more work because we need to move the `import Option` from app.js into Options.js because that's
the component which really needs it. Because the Options and Option components are now in the same folder when we import Option in the Options
component we don't need the leading `./components` reference. So our import looks like this inside of Options.js
```javascript
import Option from './Option';
```

### Video 56 - Source maps with webpack
A source map allows you to map your source code to the resulting bundle.js which is very verbose and quite optimized. So it's not easy to follow
without a source map in webpack.config.js. We are going to be adding a [devtool](https://webpack.js.org/configuration/devtool/) from webpack.
For our stuff we are going to use `cheap-module-eval-source-map`.

```javascript
devtool: 'cheap-module-eval-source-map'
```
Then restart `yarn run build`. Now if my code throws an exception I'll get the accurate line number and file of the problem.

### Video 57 - Webpack dev server
[webpack dev server](https://webpack.js.org/configuration/dev-server/) has nice features live-server doesn't have. 

```bash
yarn add webpack-dev-server@2.5.1
```
Then in webpack.config.js
```javascript
    devServer: {
        contentBase: path.join(__dirname, 'public')
    }
```
Finally we are going to modify `scripts` in package.json by removing the serve command for live-server and using webpack dev server instead.

```javascript
  "scripts": {
    "serve": "live-server public/",
    "build": "webpack",
    "dev-server": "webpack-dev-server"
  },
```
We no longer need both `yarn run build` and `yarn run serve` both running. We can do both with dev-server.
```bash
yarn run dev-server
```
Another advantage of webpack dev server is the bundle.js file isn't served from the filesystem anymore. It's served from memory. So it's quicker.

### Video 58 - ES6 class properties
This is a new syntax which helps get rid of the constructor method and method binding. We are going to use a [babel plugin](https://babeljs.io/docs/en/plugins)
to do that. In the experimental presets. We are going to use the transform-class-properties.

```bash
yarn add babel-plugin-transform-class-properties@6.24.1
```
With new class properties we don't have to use `this.` anymore. Nor do we have to bind methods.
```javascript
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
    getGreeting = () => {                    // no binding to 'this' needed. NOTE it is an arrow function.
        return `Hello, I'm ${this.name}.`;
    };
}
const newSyntax = new NewSyntax();
console.log(newSyntax);
```
Now we will update AddOption.js. I'm just going to put before and after snippets.

Before
```javascript
export default class AddOption extends React.Component {

    // Need to setup the constructor because we need to bind handleAddOption.
    constructor(props) {
        super(props);
        this.handleAddOptionChild = this.handleAddOptionChild.bind(this);
        this.state = {
            error: undefined
        }

    }
```
After
```javascript
export default class AddOption extends React.Component {
        state = {
            error: undefined
        }
        handleAddOptionChild = (e) => {
            e.preventDefault();
            const option = e.target.elements.optionButton.value.trim();
            const errMsg = this.props.handleAddOption(option);  // CALLS the parent method, passing in the new value.
            this.setState(() => ({ error: errMsg }));
            if (!errMsg) {
                e.target.elements.optionButton.value = '';
            }
        }
```
This works great for class properties and event handlers.

## Section 7 - Using Third-party component
### Video 59 - Section intro
### Video 60 - Passing Children to Component

The built-in `children` prop. In this tutorial we are going to use children to may a layout template. This is a template will have a header
and footer which is standard and the middle with be the dynamic elements per page.
```javascript
const Layout = () => {
    return (
        <div>
        <p>header</p>
        <p>footer</p>
        </div>
    );
}
ReactDOM.render(<Layout />, document.getElementById('app'));
```
So now I want to pass in the middle, dynamic JSX into layout and have it rendered. How do we do that?

One way to do that would be to pass the content into the layout template
```javascript
const Layout = (props) => {
    return (
        <div>
        <p>header</p>
        {props.content}
        <p>footer</p>
        </div>
    );
}
const template = (
    <div>
    <h1>Page title</h1>
    <p>This is my page.</p>
    </div>
)
ReactDOM.render(<Layout content={template}/>, document.getElementById('app'));
```
But there's a better way to pass jsx into components. You can just put the jsx between opening and closing `<Layout>` tags as follows
and reference it as props.children.

```javascript
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
```

### Video 61 - Setting up React-Modal
This section we are going to replace the javascript alert with the [react modal](https://github.com/reactjs/react-modal).
Example from the documentation.
```javascript
<Modal
  isOpen={modalIsOpen}
  onAfterOpen={afterOpenModal}
  onRequestClose={closeModal}
  style={customStyles}
  contentLabel="Example Modal">
My content
</Modal>
```
```bash
yarn add react-modal@2.2.2
yarn run dev-server
```
Create a new component `OptionModal`.
```javascript
import React from 'react';
import Modal from 'react-modal';

const OptionModal = () => {
    return (
        <div>
        some text
        </div>
    )
};

export default OptionModal;
```
Then add `<OptionModal>` to the IndecisionApp render().

Now we are going to swap in the React modal tag in our OptionModal tag.

Inside the `<OptionModal>` we need to define a few properties, most importantly, isOpen. To manage this we have to pass in 
props to OptionModal so we know whether to display the modal or not. Then we have to add a new state to Indecision app called
`selectedOption` to indicate whether the user has asked for an option answer. Finally we need to add a mechanism to 
close the modal. To do that we need to define a method in IndecisionApp which is passed down to the OptionModal to tell
it what to do to close and clear selectedOptions.

There's a lot to change here. I'm just showing the snippets that matter.

IndecisionApp
```javascript
    state = {
        options: [],
        selectedOption: undefined   // new state
    };

    // new handler to clear out when user closes modal.
    handleClearSelectedOption = () => {
        console.log("handleClearSelectedOption");
        this.setState(() => ({selectedOption: undefined}));
    }

// two new arguments to OptionModal.
render() {
        const subtitle = 'Put your life in the hands of a computer.';
        return (
            <div>
                <OptionModal 
                selectedOption={this.state.selectedOption}
                clearFunction={this.handleClearSelectedOption}/>
            </div>
        )
    }

```

OptionModal
```javascript
const OptionModal = (props) => (
    <Modal
        isOpen={!!props.selectedOption}
        contentLabel="selected result"
        onRequestClose={props.clearFunction}
    >
        <h2>Selected option</h2>
        {props.selectedOption && <h3>{props.selectedOption}</h3>}   // conditionally add selected option to display
        <button
            onClick={props.clearFunction}>OK</button>               // onClick, call IndecisionApp handleClearSelectedOption
    </Modal>
);
```

One last thing on modal. `onRequestClose` takes a function and calls it when the user tries to close the modal. Either
via ESC or OK key. So we are going to call the new handleClearSelectedFunction for both.

### Video 62 - Bonus: Refactoring other stateless functional components
We are going to clean up the stateless components so the render doesn't specifically have a return. We update Action, Header,
Option and Options.

## Section 8 - Styling React
### Video 63 - Section Intro
### Video 64 - Setting up Webpack with scss
SCSS is a CSS pre-processor. Adds supports for variables and mix-ins. 

```bash
mkdir -p src/styles
```
We need to add a rule to webpack.config.js to allow for scss processor. We need to use the [loader for SCSS](https://www.npmjs.com/package/css-loader). We are also going to add [style-loader](https://www.npmjs.com/package/style-loader) which adds the css to the
DOM by adding the `<style>` tag.


```bash
yarn add style-loader@0.18.2 css-loader@0.28.4
```
Then in webpack.config.js
```javascript
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    }
```
Then in app.js add
```javascript
import './styles/styles.css';   // this will embed the styles.css file in the dom.
```
Now we are going to include [scss](sass-lang.com/guide) to learn about sass/scss variables. sass and scss are similarly 
processed, but the syntax is slightly different. We are going to use scss.

We need to include a new loader to compile scss to css.
```bash
yarn add sass-loader@8.0.2
npm install node-sass  ## couldn't get node-sass installed with yarn
```
We are also going to change the name of the styles.css to styles.scss and add a variable.
```css
$brand-color: blue;
* {
    color: $brand-color;
}
```

### Video 65 - Architecture and Header Styles
We are going to break up scss files just as was done for the react components.

```bash
mkdir -p src/styles/base # used to store global style settings. 
```
In that directory create the file `_base.scss`. This is a partial file which
is why it starts with underscore.

```css
body {
    font-family: Helvetica, Arial, sans-serif;
}
```
Then in the original styles.scss we just do an import instead of definitions 
leaving off the _ and the .scss extension.
```css
@import './base/base';
```

Now we will talk about font sizing. We are going to use rem instead of font
sizes. It works better for availability. Here are some examples.
```css
h1 {
   font-size: 1rem;
}
```
1rem = 16 pixels. Which is slightly difficult to work with from a math standpoint.
So what we do is define a global setting in the css `html` selector to map
1rem to 10 pixels instead.
```css
html {
   font-size: 62.5%;
}
```
Now if you define something with 2.4rem, that equates to 24 pixels under normal circumstances.

Now we are going to start creating separate scss files for each component
```bash
mkdir -p src/styles/components
```
Then add a _header.scss file where we will keep all the display presentation
for the Header component.

```css
.header {
    background: #20222b;
    color: white;
    margin-bottom: 4.8rem;
    padding: 1.6rem 0;
}
```
The `.header` selector above defines a class. So we have to add that argument
to the `className=` for the header jsx file. So in Header.js just add the
`className=header` to the parent `<div>`.

We could nest the `h1` selector inside the `.header` definition. But that can
get messy quickly. So we are going to use something called Block-Element-Modifier (BEM). 

```css
.header {
    background: #20222b;
    color: white;
    margin-bottom: 4.8rem;
    padding: 1.6rem 0;
}

.header__title {
    font-size: 3.2rem;
    margin: 0;
}
```
Then the `<h1>` for the Header.js file we put the className="header__title".


### Video 66 - Reset that $#!*
This section attempts to handle style differences between browsers. So we
are going to add resets. There are libraries which do this. We are going to
use [normalize.css](https://necolas.github.io.normalize.css/).
me
```bash
yarn add normalize.css@7.0.0
```
Now import normalize into app.js
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import IndecisionApp from './components/IndecisionApp';
import 'normalize.css/normalize.css'
import './styles/styles.scss';
ReactDOM.render(<IndecisionApp/>, document.getElementById('app'));
```
But now we have to change webpack.config.js so it also processes .css files
and not just scss. So we change the test of the rule from `/\.scss$/` to
`/\.s?css$/`.

### Video 67 - Theming with Variables
In this section we are going to create a settings file which will contain
many of what would normally be referred to as global constants. For things like
colors and font sizes. `src/stiles/base/_settings.scss` will just define variables for themes.

```css
// colors
$off-black: #20222b;
$off-white: #a5afd7;

$dark-blue: #333745;

// font sizes
$m-size: 1.6rem;
$l-size: 3.2rem;
$xl-size: 4.8rem;
```

Next we are going to deal with container settings in `_container.scss`. We
are going to center the content and add padding.

```css
.container {
    max-width: 60rem; // fixes the max width no matter the window size.
    margin: 0 auto; // centers on left and right by using auto
    padding: 0 $m-size; // puts a little padding for this container on the right and left
}
```
### Video 68 - Big Button and Options List
We are going to make the main decision button purple and do a little styling
of the button as .big-button in _button.scss. 
```css
.big-button {
    background: $purple;
    border: none;
    border-bottom: .6rem solid darken($purple, 10%);
    color: white;
    font-weight: bold;
    font-size: $l-size;
    width: 100%;
    margin-bottom: $xl-size;
    padding: 2.4rem;
}
```
The border arguments above are to give it a bit of a 3d effect on the bottom.
The `darken()` function is one of the sass functions available with the distribution.
You can see a list of [all the functions](https://sass-lang.com/documentation) modules.

Then we are going to use the `disabled` pseudo-class to change the display
a bit when the button is disabled.
```css
.big-button:disabled {
    opacity: .5;
}
```
We're also going to change the cursor appearance when over a button is clickable.
So in base.scss below defines a pointer (the hand) when something is enabled and
the arrow (default) when it's not.
```css
button {
    cursor: pointer;
}
button:disabled {
    cursor: default;
}
```
We can generalize several other buttons not the What should I do button. So we'll
add these to button.scss.
```scss
// general button stuff class
.button {
    background: $purple;
    border: none;
    border-bottom: .3rem solid darken($purple, 10%);
    color: white;
    font-weight: 500;
    padding: $s-size;
}
// this is a modifier. Hence the -- instead of the __ which is for elements. This is all just a convention.
.button--link {
    background: none;
    border: none;
    color: $off-white;
    padding: 0;
}
```
Then wherever we want to use buttons as links we add `className="button button--link"` as we do in the Options.js and Option.js files.


### Video 69 - Styling the Options List
In this one we are just going to clean up the Options component. We do this by adding css
for a new component called `_widget.scss`.
```css
.widget-header {
    background: $blue;
    color: $off-white;
    display: flex;       // use a flex box display which spreads the internal elements across the entire div
    justify-content: space-between; // pushes the 'Your Options' far to the left and 'Remove All' far to the right putting as much 'space-between' as possible.
    padding: $m-size;
}
```
### Video 70 - Styling Option Item
Now we are styling the individual Option component. In this section we want to add leading
digits in front of each option. We do that by taking advantage of a value in the `map()` 
command. So we are going to modify the `Options.js` file so beyond passing in the option,
we can get an index of which counter the map() function is currently on.
```javascript
{
props.options.map((option, index) => (  // notice we added the 'index' argument.
    <Option
        key={option}
        optionText={option}
        count={index + 1}            // also added a new property called count.
        handleDeleteOption={props.handleDeleteOption}
    />
))
}
```
Then in Option.js we use the new property and add our styling.
```javascript
const Option = (props) => (
    <div className="option">
        <p className="option__text"> {props.count}. {props.optionText}</p>
        <button
        className="button button--link"
            onClick={(e) => {
                props.handleDeleteOption(props.optionText)
            }}
        >
            remove
        </button>
    </div>
);
```

For the input form we want to have the text fill as much of the left side as
available, leaving just enough for the Add Option button on the right. To
do that we add to className definitions (add-option and add-option__input) to the AddOption form and then some css
```javascript
    render() {
        return (
            <div>
                {this.state.error && <p className="add-option-error">{this.state.error}</p>}
                <form className="add-option" onSubmit={this.handleAddOptionChild}>
                    <input className="add-option__input" type='text' name="optionButton" />
                    <button
                       className="button">Add Option</button>
                </form>
            </div>
        )
    }
```
```css
.add-option {
    display:flex;  // fills the container

}
.add-option__input {
    background: $dark-blue;
    border: none;
    color: $off-white;
    border-bottom: .3rem solid darken($dark-blue, 10%);
    flex-grow: 1;   // tells the input element to grow as much as possible up to the AddOption button.
    margin-right: $s-size;
    padding: $s-size;
}
```
### Video 71 - Styling React Modal
Now we are going to style a 3rd party component. You need to use the dev tools inspector
quite a bit to figure out what the library is using. In this case it uses a class called
`ReactModal__Body--open` when the modal is visible. It also adds a `<div>` tag with the
class `ReactModalPortal`.

_modal.scss
```javascript
.ReactModalPortal > div {   // this syntax targets divs which are direct decendants of ReactModalPortal
    opacity: 0;
}
.ReactModalPortal .ReactModal__Overlay { // targets a className inside the ReactModalPortal className
    align-items: center;
    display: flex;
    justify-content: center;
    transition: opacity 200ms ease-in-out;  // smoother transition.
}
.ReactModalPortal .ReactModal__Overlay--after-open { // transitions from nothing to complete opacity
    opacity: 1;
}
.ReactModalPortal .ReactModal__Overlay--before-close { // transitions from opaque to disappear.
    opacity: 0;
}
.modal {
    background: $light-blue;
    color: white;
    max-width: 30rem;
    outline: none;
    padding: $l-size;
    text-align: center;
}

.modal__title {
    margin: 0 0 $m-size 0;

}
.modal__body {
    margin: 0 0 $l-size 0;
    font-size: 2rem;
    font-weight: 300;
    word-break: break-all;        // if you have a really wrong word, this will put in a linebreak somewhere so things don't go way to the right.
}
```
```javascript
const OptionModal = (props) => (
    <Modal
        isOpen={!!props.selectedOption}
        contentLabel="selected result"
        closeTimeoutMS={200}                      // used for transitioning to close
        onRequestClose={props.clearFunction}
        className="modal"                         // our modal css class
    >
        <h2 className="modal__title">Selected option</h2>
        {props.selectedOption && <h3 className="modal__body">{props.selectedOption}</h3>}
        <button
            className="button"
            onClick={props.clearFunction}>OK</button>
    </Modal>
);
```

### Video 72 - Mobile Considerations
Chrome has a tool call device simulation toolbar on the upper left side which lets you change the browser so it appears to be a mobile screen. Once it's open along the top of the screen
you will see a tool bar that lets you select appearances for a variety of phones.

It's currently using the default of 980 pixels and tries to render that in a 320 pixel screen
so everything gets zoomed out making things hard to read.

First in index.html add the line
```html
<meta name="viewport" content="width=device-width, initial-scale=1"/>
```
Tells the viewport to use the real devices width. When you switch devices things will now
look a lot better.

We are going to change some of the spacing and the `<input>` form element and `<button>` will
now be re-aligned on mobile devices so they are stacked one on top of the other. To do this
we need to change `addoption.scss` so the buttons stack vertically by using media queries.
```css
@media (min-width: 45rem) {
    .add-option {
        flex-direction: row;
    }
    .add-option__input {
        margin: 0 $s-size 0 0;
    }
}
```
The `min-width: 45rem` argument means that use the directives when the minimum width is above 
45rem. So we end up redefining some of these values for the normal definitions of add-option 
and add-option_input, then overriding the directives when the screen is wider.


### Video 73 - Bonus Favicon
## Section 9 - React-Router
### Video 74 - Section Intro
Course solutions: https://budget-app.mead.io and http://links.mead.io/budget-app.

We are going to:
1. Login
1. store data in the database
1. create user accounts
1. add expense data. including validation
1. CRUD expenses

### Video 75 - Server vs Client Routing

Server-side is the more traditional way of doing this where requests go across the
network and retrieve new html.

Client-side is the more modern way were client side javascript dynamically changes what
is displayed on the screen. You still have to load all the javascript the first time
from the server, but after than, it's all on the client. We do that with the html5 history
API. We can watch for URL changes and activate some javascript to render a new component.


### Video 76 - Setting up Budget App

We are going to create a boilerplate project which we will then clone.

### Video 77 - React-Router 101
To learn more about [react router](https://github.com/ReactTraining/react-router) or
[here](https://reactrouter.com/).

 ```bash
 yarn add react-router-dom@4.2.2  # because we are only using this for a webapp. If we were
                                  # doing native react we would use react-router-native
```
There are many react router variables you can access in the react-router-dom module. We
are going to use two: BrowserRouter and Route.

In app.js we are going to use the react-router stuff.
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import 'normalize.css/normalize.css'
import './styles/styles.scss';

const ExpenseDashboardPage = () => (
    <div>this is the dashboard</div>
);
const AddExpensePage = () => (
    <div>do some adding</div>
);
const routes = (
    <BrowserRouter>
        <div>
            <Route path="/" component={ExpenseDashboardPage} />  // define a default route
            <Route path="/create" component={AddExpensePage}/>   // define a /create route
        </div>
    </BrowserRouter>
);
ReactDOM.render(routes, document.getElementById('app'));
```
But the problem with this is if you try to load /create from the browser it is going
to make a server request and that's going to return a 404 because /create doesn't exist
on the server.
So we need to modify webpack.config.js to tell the dev-server to always just serve
index.html. This is done by adding the directive `historyApiFallback: true`.

After this is done and you restart dev-server it will serve a page. The problem now is that
the route specified, `/create` is actually matching on both `/` and `/create`. So that
needs to be fixed. To do that we just add `exact={true}` to the Route definitions.

### Video 78 - Setting up 404
Basically we are going to render a component if we get a path we haven't matched elsewhere.

We are going to import the `Switch` component from react-router-dom in app.js and create a new
NotFoundPage component. The Switch component will stop when it gets its first path match.
If no match is found it will load the last page.
```javascript

const routes = (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={ExpenseDashboardPage} exact={true} />
            <Route path="/create" component={AddExpensePage} exact={true} />
            <Route path="/edit" component={EditExpensePage} exact={true} />
            <Route path="/help" component={HelpPage} exact={true} />
            <Route component={NotFoundPage} />
        </Switch>
    </BrowserRouter>
);
```
### Video 79 - Linking Between Routes
The goal in this is provide links to the user which bypass the desire to go back to the
server to get the page. To do that we add some javascript to our links. react-route-dom 
provides a component called `<Link>` to handle this.
```javascript
const NotFoundPage = () => (
    <div>
        <div>
            404 - not found
            <Link to="/">Lost? go here.</Link>
        </div>
    </div>
);
```
react-router-dom also has the component `<NavLink>` which is better suited for navigation
links. It allows us to call out a link when you are on that page. You can add props such
as `activeClassName` which will apply a css class to that link when it is the current page
you are on.
```javascript
const Header = () => (
    <div>
    <h1>Expensify App</h1>
    <NavLink to="/" activeClassName="is-active" exact={true}>Home</NavLink>
    <NavLink to="/create" activeClassName="is-active">Create</NavLink>
    <NavLink to="/edit" activeClassName="is-active">Edit</NavLink>
    <NavLink to="/help" activeClassName="is-active">Help</NavLink>
    </div>
);
```
You need to create a css class for is-active.

### Video 80 - Organizing our Routes
We are going to break our router into it's own location so app.js isn't as big. Also going
to break out each page into its own file as well. This will then equate one route to one file.
```bash
mkdir -p src/routers # then create AppRouter.js
```
```javascript
import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import AddExpensePage from './../components/AddExpensePage';
import EditExpensePage from './../components/EditExpensePage';
import ExpenseDashboardPage from './../components/ExpenseDashboardPage';
import Header from './../components/Header';
import HelpPage from './../components/HelpPage';
import NotFoundPage from './../components/NotFoundPage';

const AppRouter = () => (
    <BrowserRouter>
    <div>
        <Header/>
        <Switch>
            <Route path="/" component={ExpenseDashboardPage} exact={true} />
            <Route path="/create" component={AddExpensePage} exact={true} />
            <Route path="/edit" component={EditExpensePage} exact={true} />
            <Route path="/help" component={HelpPage} exact={true} />
            <Route component={NotFoundPage} />
        </Switch>
        </div>
    </BrowserRouter>
);
export default AppRouter;
```
I also moved all the pages into their own components.
### Video 81 - Query Strings and URL
When react-router finds a match it routes to the component it is also passing some props down.
So I change the EditExpensePage.js file to pass in props.
```javascript
import React from 'react';
const EditExpensePage = (props) => {
    console.log(props);
    return (
        <div>do some editing</div>
    );
};
export default EditExpensePage;
```
When we reload the edit page we will see several objects under the props.
The `history` object contains a lot of methods in it that allow you to manipulate the browser history and where the user goes with javascript.

`match` object contains information about why the current route is a match.

`location` object tells you about the current url. The `search` string in the location object
gives you the query string info. The `hash` value would give you the `#myvalue` element from
the url `/edit#myvalue`.

We need to edit an actual expense and so we are going to have something like `/edit/44`. react-router allows us to do this.
So in AppRouter.js.

```javascript
const AppRouter = () => (
    <BrowserRouter>
    <div>
        <Header/>
        <Switch>
            <Route path="/" component={ExpenseDashboardPage} exact={true} />
            <Route path="/create" component={AddExpensePage} exact={true} />
            <Route path="/edit/:id" component={EditExpensePage} exact={true} />  // now added url parameter :id
            <Route path="/help" component={HelpPage} exact={true} />
            <Route component={NotFoundPage} />
        </Switch>
        </div>
    </BrowserRouter>
);
```
So when I go to `/edit/99` the `match.params` object will have a key/value pair for `id`.
It should be noted that the :id value is only available if the link is generated with `<Route>`.

### Video 82 - Build It: Router for Portfolio Site
Clone the expensify app to create a portfolio website.

## Section 10 - Redux
### Video 83 - Intro
Redux is a library used to help manage state. It can do more than what can be done with component
state for large applications.

### Video 84 - Why do we need something like Redux?
Issues we run into if we don't use Redux and just use component state.

#### Simple App - Indecision App

Component Tree

1. Indecision App - state lived in here. class-based component. state was just a list of strings.
   1. Options - needed list of strings
       1. Option - needed individual string
   1. AddOption - had an action method between IndecisionApp and AddOption for adding to IndecisionApp's list of strings.
   
This was manageable as component state because there was a direct connection between all
of the relevant components.

The components we create are not really reusable. For example the Action component used
two properties from IndecisionApp, handlePick and hasOptions. Those could be easily passed
down to Action component from IndecisionApp. But you couldn't also attach the Action component
to the Header component because Action needed those two properties.

#### Complex App - Expensify App

We don't really have this direct connection between all the components. We have something
that looks like this instead.

Component Tree

1. AddExpensePage
   1. AddExpense
1. ExpenseDashboardPage
   1. Expenses
      1. Expense

These are rendered by react-router and have no direct connection to each other's state. There
is no common parent component. Where does the expense data go?

In the complex app, we need components to get access to application state without having to
pass properties between components. If we can do this we could put the AddExpense component
on both the AddExpensePage and the ExpenseDashboardPage without passing properties.

To do this we write our components to interact with the Redux global state container.

#### Redux in Complex App
Continue to use properties when there is a direct interaction between parent and child.

Redux is a state container store. Example:
```javascript
{
  expenses: [
     {
     _id: 'abc',
     description: 'rent',
     amount: 109500
     }
  ]
}
```
Then we can just CRUD that store from any component anywhere. So the components are more reusable
as well.


### Video 85 - Setting up Redux
We're going to mess around in the playground folder to learn [Redux](https://redux.js.org/).

```bash
mkdir -p src/playground/redux-101.js
```
Then change webpack to use this file instead of app.js
```bash
yarn add redux@3.7.2
```
```javascript
import {createStore} from 'redux';

// call redux createStore, passing in a function which returns the default state for the app.
const store = createStore((state = {count: 0}) => {
    return state; // returning the default state.
});

// now access the state.
console.log(store.getState());
```
### Video 86 - Dispatching Actions
Actions allow us to change values in the Redux store. Actions are objects which get sent
to the store. The object describes the type of action we want to take.

Our actions are going to be things like increment, decrement, reset by dispatching various
actions.

We modify a value in the store by dispatching a new state to the store.
```javascript

// NOTE here we are passing in a second argument, action
// call redux createStore, passing in a function which returns the default state for the app.
const store = createStore((state = {count: 0}, action) => {
    console.log('running');
    switch (action.type) {
        case 'INCREMENT':
            return {count: state.count + 1}
        default:
            return state;
    }
});

// dispatching the action to the store.
store.dispatch({
    type: 'INCREMENT'
});
```

### Video 87 - Subscribing and Dynamic Actions
Subscribing is being able to watch for changes to the store. We are also going to augment
the actions sent.

```javascript
const unsub = store.subscribe(() => {
   console.log(store.getState());
});
```
The return from subscribe() is a function you can use to unsubscribe. So if we are no longer
interested in paying attention to store changes we can just call.
```javascript
unsub();
```
Now we are going over executing dynamic actions. You must include `type`, but you
can add other values too.
```javascript
const store = createStore((state = { count: 0 }, action) => {
    console.log('running ' + state.count);
    switch (action.type) {
        case 'INCREMENT':
            const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
            return { count: state.count + incrementBy }
        case 'DECREMENT':
            return { count: state.count - 1 }
        case 'RESET':
            return { count: 0 }
        default:
            return state;
    }
});
store.dispatch({
    type: 'INCREMENT',
    incrementBy: 5
});
```

### Video 88 - ES6 Object Destructuring
```javascript
const person = {
    name: 'John',
    age: 58,
    location: {
        city: 'Madison',
        temp: -4
    }
}

// destructure and set default for name if the property doesn't exist in person.
const { name = 'anonymous', age } = person;
console.log(`${name} is ${age}.`);

// destructure nested and rename a variable
const {city, temp: temperature} = person.location;
if (city && temperature) {
    console.log(`It's ${temperature} in ${city}`);
}
```
### Video 89 - ES6 Array Destructuring
It's similar to object destructuring.

```javascript
const address = ["123 Main Street", "Madison", "Wisconsin", '53719'];
// the array has 4 elements, but we are only interested in the second and third.
// so we lead with an empty comma, the leave the zip off entirely.
// I can also set the default state to AK. It will use this if there is no third item.
let [ ,cty, state = 'AK'] = address; 
console.log(`You are in ${cty}, ${state}`);
```
### Video 90 - Refactoring and Organizing

Action generators are functions which return Action objects.

In the below function we've set default values into the function with the `{}` in the
function argument list, then we destructured it and assigned a default value with
`{incrementBy = 1}`.

```javascript
const incrementCount = ({incrementBy = 1} = {}) => ({
        type: 'INCREMENT',
        incrementBy: incrementBy
});
```
Then your dispatch calls greatly simplify and are less error prone.
```javascript
store.dispatch(incrementCount({incrementBy: 5}));
store.dispatch(incrementCount());
```
### Video 91 - Reducers
For this we are going to focus on the function `createStore()`. This is a reducer function.

*Actions describe the fact that something happened, but done' specify how the application's
state changes in response. That is the job of reducers.*

`createStore` reacts to the action passed in. The action doesn't know what's done.

So we are going to reorganize a bit by creating a countReducer function and move the createStore
logic into it. This way createStore can have multiple reducers.

```javascript
const countReducer = (state = { count: 0 }, action) => {
    console.log('running ' + state.count);
    switch (action.type) {
        case 'INCREMENT':
            return { count: state.count + action.incrementBy }
        case 'DECREMENT':
            return { count: state.count - action.decrementBy }
        case 'SET':
            return { count: action.count }
        case 'RESET':
            return { count: 0 }
        default:
            return state;
    }
};

// call redux createStore, passing in a function which returns the default state for the app.
const store = createStore(countReducer);
```
1. Reducers are pure functions: the output is only determined by the input, nothing is based on state. It also has no external side effects.
1. Never change `state` or `action`. These are the objects which are passed into the reducer. Don't mutate them.

Now we are going to work with redux-expensify.js.
### Video 92 - Working with multiple reducers
We are going to use the `combineReducers` from redux to allow `createStore()` to store
multiple state data.

We are going to add:
1. ADD_EXPENSE
1. REMOVE_EXPENSE
1. EDIT_EXPENSE
1. SET_TEXT_FILTER
1. SORT_BY_DATE
1. SET_START_DATE
1. SET_END_DATE

We are going to create a separate reducers for each root property. We have two big ones.
Expenses and Filters. So we are going to create 2 reducers. Then we will combine the reducers.

Our sample date looks like this:
```javascript
const demoState = {
    expenses: [
        {
            id: '123',
            description: 'January Rent',
            note: 'This was the January rent',
            amount: 54500,
            createdAt: 0
        }
    ],
    filters: {
        text: 'rent',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
};
```

The reducer we set up for expenses is `expensesReducer`. Because we want the `createStore()`
function to return the structure of the demoState data we need to make certain the data
is returned under the `expenses` key. To do that we need to use the `combineReducers` function
as follows:
```javascript
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        default:
                return state;
    }
};


const store = createStore(
    combineReducers ({
        expenses: expensesReducer  // Assigning the expensesReducer to the expenses object.
    })
);
```
And we can do the same thing for filters. We are going to create a reducer for it, and assign
it in the createStore() function. This allows us to have multiple reducers attached to the
store.
```javascript
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        default:
                return state;
    }
};

const store = createStore(
    combineReducers ({
        expenses: expensesReducer,           // now we have multiple reducers
        filters: filtersReducer
    })
);

```

### Video 93 - ES6 Spread Operator in Reducers
```bash
yarn add uuid@3.1.0
```
The first thing we are doing is crate an action generator for the ADD_EXPENSE.
This entails three things:
1. create the action generator
1. change the expenseReducer so it returns the new state when ADD_EXPENSE type is
the action.
1. dispatch the data to the store so the expense can be added.

Create the action generator
```javascript
// define action generators
const addExpense = ({ description = '',
    note = '',
    amount = 0,
    createdAt = 0 } = {}) => ({
        type: 'ADD_EXPENSE',
        expense: {
            id: uuid(),
            description,
            note,
            amount,
            createdAt
        }
    })
```

Change the expense reducer to recognize ADD_EXPENSE
```javascript
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return state.concat(action.expense); // note: concat doesn't modify the source array, it just returns a new one
        default:
            return state;
    }
};
```

Dispatch new data to the store.
```javascript
store.dispatch(addExpense({ description: 'rent', amount: 100 }));
```

Now we will use the ES6 operator to do the same work we did above, just do it
in a simplified way.
```javascript
const names = ["John", "Steve"];
names.push('Bill');   // now names is length 3
names.concat('Dave'); // returns an array of length 4, but names is still 3.

// now use the spread operator
[...names]    // names still contains 'John', 'Steve', 'Bill'.
[...names, 'Mike']  // names still contains the original 3, but the return from this statement contains new array of length 4

['Adam', ...names, 'Mike'] // now returns length 5 with Adam first and Mike last.
```

Knowing this, we are now going to change the expenseReducer to use the spread operator
```javascript
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ]
        default:
            return state;
    }
};
```
So to add a removeExpense action generator we do the following:

remove expense generator
```javascript
const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id: id
});
```
Change the expensesReducer
```javascript
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            console.log("REMOVE ID",action.id);
            return state.filter((expense) => action.id !== expense.id );
        default:
            return state;
    }
};
```

Then dispatch
```javascript
const expense1 = store.dispatch(addExpense({ description: 'rent', amount: 100 }));
store.dispatch(removeExpense({id: expense1.expense.id}));
```
### Video 94 - Spreading Objects
Spreading objects isn't available by default. So we have to add it to the `.babelrc`
file as a plugin. You can find it by searching for 'babel spread operator'.
```bash
yarn add babel-plugin-transform-object-rest-spread@6.23.0
```
```javascript
{
    "presets": ["env", "react"],
    "plugins": ["transform-class-properties",
                "transform-object-rest-spread"]
}
```

```javascript
const user = {
    name: 'Jen',
    age: 24
}
console.log({
    ...user,
    location: "Madison",
    age: 27
});
```
So in the above example, we are adding `location` and overriding `age`. If we reorganized
our call to be this.
```javascript
console.log({
    location: "Madison",
    age: 27,
    ...user,
});
```
We wouldn't override `age`. The age of 27 would be overridden by the user.age value, 24.

So we are going to use this feature to write the editExpense function and reducer.

The editExpense action generator in this case is going to take two arguments. The
expense id, and an object indicating which fields in the expense you want to modify.
So when dispatching that it may look like this.
```javascript
store.dispatch(editExpense(expense2.expense.id, {amount: 500}));
```
The editExpense action generator will look like this
```javascript
// passing in the id of the expense to modify and the updates object with the new values.
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id: id,
    updates
});
```
Now the spread object feature is used in the expensesReducer. Here's the case statement.
```javascript
case 'EDIT_EXPENSE':
    console.log('EDIT ', action.id);
    
    // we need to run a map() function over all the expenses.
    // in that map() function if the element id from the map matches the
    // id we passed in we are going to use object spreading to merge the
    // results for that expense object. We first ...expense to spread the
    // source expense, then we ...action.updates to replace the appropriate
    // values.
    return state.map((expense) => {
        if (expense.id === action.id) {
            return {
                ...expense,
                ...action.updates
            };
        }
        return expense;
    });
```
### Video 95 - Wrapping up our Reducers
In this section we are first going to add action generators for sortBy on the filters.
```javascript
const setSortByAmount = () => ({
    type: 'SET_SORT_BY',
    sortBy: 'amount'
});
const setSortByDate = () => ({
    type: 'SET_SORT_BY',
    sortBy: 'date'
});
```
In reducer
```javascript
case 'SET_SORT_BY':
    return {
        ...state,
        sortBy: action.sortBy
    }
```
Finally add actions for setStartDate() and setEndDate().

### Video 96 - Filtering Redux Data
In this video we are going to write a function which interacts between the expenses
and the filter to return a modified output without modifying the actual redux data.

```javascript
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate} = filters) => {

    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.includes(text);
        return startDateMatch && endDateMatch && textMatch;
    });
};
```
### Video 97 - Sortin Redux Data
We want to sort by date or amount. To add sorting we will use the array sort() method.
To use sort() we need to define a compare function.

```javascript
```

## Section 11 - React and Redux
### Video 98 - Section Intro
In this section we will be creating 'connected components' which means react components
interacting with the redux store.
When we do that components can fetch data from the store and when the data changes have
the component automatically update. We will also be able to dispatch data right from
the components.

### Video 99 - Organizing Redux
In this section we are going to move the elements of redux-expensify.js into our main
app.

```bash
mkdir -p src/actions
mkdir -p src/reducers
mkdir -p src/store
mkdir -p src/selectors
```
We are going to make two files inside /actions, expenses.js and filters.js and move
all our action generator functionality in there. When we copy these action generators
into the new file I'm going to export them as named exports.

We are going to create two files in /reducers, expenses.js and filters.js and move the
reducers and the default state variables in there. In these files, since there really
is only one function we care about, the reducer itself, we can reference it as the
default export.

Next we need to land the function `getVisibleExpenses()` somewhere. That somewhere
is in the file /selectors/expenses.js.

Finally we need to tie everything together with the redux store. We do that by creating
the file /store/configureStore.js.

```javascript
import { createStore, combineReducers } from 'redux';
import expensesReducer from './../reducers/expenses';
import filtersReducer from './../reducers/filters';


// create the store inside of the default export function.
export default () => {
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer
        })
    );
    return store;
}

```

So our new directory structure looks like this.
1. root
   1. public
      1. images
      1. index.html
   1. src
      1. actions
      1. components
      1. reducers
      1. routers
      1. selectors
      1. store
      1. styles
         1. base
         1. components
      1. app.js

Now that everything has been moved we are going to start to expose the new functionality
and file structures in our app.js.
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore'
import {addExpense} from './actions/expenses';
import {setTextFilter} from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css'
import './styles/styles.scss';

const store = configureStore();
store.dispatch(addExpense({description: 'Water bill', createdAt: 10, amount: 10000}));
store.dispatch(addExpense({description: 'Gas bill', createdAt: 9, amount: 7000}));
store.dispatch(setTextFilter('gas'));
console.log(store.getState());
console.log(getVisibleExpenses(store.getState().expenses, store.getState().filters));
ReactDOM.render(<AppRouter />, document.getElementById('app'));
```
Now when you reload the page we see the console output only showing the 'gas' bill.
So everything seems to be working.


### Video 100 - The Higher Order Component

We are going to use something new, called higher order components. Using the playground
file hoc.js.

A higher order component is a component that renders another component. 

For this example let's assume we are writing a medical application and that
application displays personal information. We want the application to alert
the user they are viewing private information.

So we want to conditionally add a banner warning the user the information below is private.

The HOC components allow us to:
1. reuse code
1. use render hijacking
1. do property manipulation
1. abstract the state of the application

So we create a function which takes the original source component we want to wrap, then we return
a new component when includes the original component and the new data we want to wrap it in. The
returned, wrapped version of the original component can then be rendered by ReactDOM.
Pay particular attention to how we use the spread object operation to pass the props down
to the WrappedComponent.
```javascript
// this is a regular function, not a component. But it takes the source
// component passed in and returns a new component which encompasses
// the original component.
// the property isAdmin will conditionally render the banner.
const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info. Please don't share.</p>}
            <WrappedComponent {...props}/>
        </div>
    );
};

// AdminInfo is a higher order version of Info
const AdminInfo = withAdminWarning(Info);
ReactDOM.render(<AdminInfo isAdmin={true} info="This is the detail"/>, document.getElementById("app"));
```
Here's another HOC which checks to see if you need to be authenticated to view the component.
```javascript
const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? <WrappedComponent {...props}/> : <p>Not authorized</p>}
        </div>
    );
};
const AuthInfo = requireAuthentication(Info);
ReactDOM.render(<AuthInfo isAuthenticated={true} info="This is the detail"/>, document.getElementById("app"));
```
### Video 101 - Connecting Store and Component with React-Redux
The goal for this video is to list the expenses on the dashboard page. 
The first hurdle is to get the expense information from the store from within the react components.

The React-Redux library only provides two things a `Provider` component and the `connect()` function.

We will install react-redux.
```bash
yarn add react-redux@5.0.5
```

We need to import Provider into app.js. 
```javascript
import {Provider} from 'react-redux';

```
Provider provides the redux store to all of the application components. To do this we wrap our
entire application in a Provider tag and specify the store as a property to the Provider tag.

So before Provider our code looked like this:
```javascript
ReactDOM.render(<AppRouter/>, document.getElementById('app'));
```
after
```javascript
const store = configureStore();
const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
```
Now all components have access to the store via `connect()`.

The way this is done is a bit confusing so I'm going over this with a simpler example.

We create a new component called ExpenseList.js. Which looks something like this.

```javascript
import React from 'react';
import {connect} from 'react-redux';
const ExpenseList = (props) => (
    <div>
        <h1>Expense List: {props.name}</h1>
    </div>
);
```
Inside of there we are going to create a HOC function called `ConnectExpenseList` which
does the following:
1. creates the new function
1. the function calls `connect(state)` whose first argument is also a function containing what data to pass.
1. Wraps `ExpenseList` in the new connect.
1. We export the `ConnectExpenseList` as the default component for the file.

```javascript
// connect is a higher order function, so we need to call that, with another component argument.
const ConnectedExpenseList = connect((state) => {
    return {
        name: 'John'
    };
})(ExpenseList);
export default ConnectedExpenseList;
```
When we are done, the object returned with the name 'John' is a wrapped version of ExpenseList
and passes that data as props into ExpenseList. The function signature is a bit weird for 
connect(). Because the first argument is itself a function. The return from connect() is a function
which you pass in the component you are going to wrap.

For our real component we want to pass the expenses in. So it really looks like this:
```javascript
const ConnectedExpenseList = connect((state) => {
    return {
        expenses: state.expenses
    };
})(ExpenseList);
```
Now expenses is available as a prop to ExpenseList.

This however is a really messy way of presenting the functions. The more common way to organize
things is to have a separate function to map the redux state to the properties, then use the
anonymous `export default` for the component.
```javascript
const mapStateToProps = (state) => {
    return {
        expenses: state.expenses
    };
};

export default connect(mapStateToProps)(ExpenseList);
```
The **biggest feature** of this beyond providing the state data is that the data is reactive. What
this means is that if another component changes the expense data, the ExpenseList component
will automatically be updated/rerendered to reflect the changes.

### Video 102 - Rendering Individual Expenses
We create a new component ExpenseListItem.js to render description, amount and createdAt. Then
use map() to generate the components.

```javascript
import React from 'react';

const ExpenseListItem = ({description, amount, createdAt}) => (
    <div>
        <span>{description}</span>
        <span>{amount}</span>
        <span>{createdAt}</span>
    </div>
);
export default ExpenseListItem;
```
Notice how we destructure the input parameters to the component. We can ONLY do this if we
use the spread operation when calling this component in the ExpenseList component.
```javascript
import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';

const ExpenseList = (props) => (
    <div>
        <h1>Expense List</h1>
        {props.expenses.map((expense) => {
            return <ExpenseListItem key={expense.id} {...expense}/>   // Notice how we spread the expense object.
        })}
    </div>
);
```

Now we are going to use our default selector from /selectors/expenses.js and call that function
in our mapStateToProps() function.

So this:
```javascript
const mapStateToProps = (state) => {
    return {
        expenses: state.expenses
    };
};
```
becomes this:
```javascript
const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    };
};
```

### Video 103 - Controlled Inputs for Filters
We are going to create a new component in /components/ExpenseListFilters.js. It is basically
going to be a `<input>` tag. But we want to pre-populate it with the current textFilter value
and modify the store from the form data.

So we need the component to be passed the value from the store.
```javascript
import React from 'react';
import ExpenseListItem from './ExpenseListItem';
import {connect} from 'react-redux'

const ExpenseListFilters = (props) => (
    <div>
        <input type='text' value={props.filters.text} />
    </div>
);
const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};
export default connect(mapStateToProps)(ExpenseListFilters);
```
And add the new component to the dashboard.
```javascript
import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';
const ExpenseDashboardPage = () => (
    <div>
        <div>this is the dashboard</div>
        <ExpenseListFilters/>
        <ExpenseList />
    </div>
);
export default ExpenseDashboardPage;
```
Now we want to dispatch changes to the input field the user types in back to the redux store.

To do this we have to add a function `onChange` to the `<input>` tag and set the value
in the store. But we also have to call dispatch on the store to set the text filter. This
is actually easy because in addition to passing the properties to a component, redux also
passes a copy of the dispatch() function with the props field. So you can dispatch events
to the redux store. Here's how this is all done.

```javascript
import {setTextFilter} from '../actions/filters';             // Import the setTextFilter

const ExpenseListFilters = (props) => (
    <div>
        <input type='text' value={props.filters.text} onChange={(e) => {
            console.log(e.target.value);
            props.dispatch(setTextFilter(e.target.value));
        }} />
    </div>
);
```
Notice the onChange() function. the `props.dispatch(setTextFilter(e.target.value))` is where
you set the new value in the redux store.

To add the Remove Item button we do some similar things.
1. import connect and removeExpense
1. destructure the id and dispatch data into ExpenseListItem
1. change the export default to `connect()(ExpenseListItem)`
1. dispatch the call to removeExpense, passing in the id.

```javascript
import React from 'react';
import {connect} from 'react-redux'
import {removeExpense} from '../actions/expenses';

// Notice we are now destructuring the id and dispatch values.
const ExpenseListItem = ({description, amount, createdAt, id, dispatch}) => (
    <div>
        <span>{description}</span>
        <span>{amount}</span>
        <span>{createdAt}</span>
        <span>
            <button onClick={(e) => {
                dispatch(removeExpense({id:id}));  // passing in an object with the id
            }}>Remove</button>
            </span>
    </div>
);
export default connect()(ExpenseListItem);
```

### Video 104 - Dropdown for Picking SortBy
We're going to add a dropdown which allows the user to select the way they want the expenses sorted.

It's basically like the last video, except using a `<select>` and some conditional logic.

We do the following:
1. import setSortByAmount and setSortByDate from /actions/filters.
1. set the value= default for the `<select>` from the props
1. write an onChange() function to conditionally change sortBy.

The snippet added to ExpenseListFilters will look like this:
```javascript
<select
    value={props.filters.sortBy}
    onChange={(e) => {
        const v = e.target.value;
        console.log('v=', v);
        switch (v) {
            case 'date':
                props.dispatch(setSortByDate());
                return;
            case 'amount':
                props.dispatch(setSortByAmount());
                return;
        }
    }}>
    <option value='date'>Date</option>
    <option value='amount'>Amount</option>
</select>
```

### Video 105 - Created Expense Add/Edit Form
### Video 106 - Setting up a Date Picker
### Video 107 - Wiring up Add Expense
### Video 108 - Wiring up Edit Expense
### Video 109 - Redux Dev Tools
### Video 110 - Filtering By Dates

## Section 12: Testing Your Application


