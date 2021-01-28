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
### Video 57 - Webpack dev server
### Video 58 - ES6 class properties

## Section 7 - Using Third-party component
