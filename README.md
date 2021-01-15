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

### Video 15 - ES6 Aside: Arrow functions part 2

### Video 16 - Events and Attributes

### Video 17 - Manual Data Binding

### Video 18 - Forms and Inputs

### Video 19 - Arrays in JSX

### Video 20 - Picking an Option

### Video 21 - BUild it: Visibility Toggle

## Section 4 - React Components
