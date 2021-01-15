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

```
var template = <div><h1>App.js is running</h1><p>This is some info</p></div>;
```
or to make it clearer, wrap everything in a `(` and `)`.
```
var template = (
    <div>
      <h1>App.js is running</h1>
      <p>This is some info</p>
    </div>);
```

### Video 11 - JSX Expressions

### Video 12 - Conditional Rendering in JSX

### Video 13 - ES6 Aside: const and let

### Video 14 - ES6 Aside: Arrow functions

### Video 15 - ES6 Aside: Arrow functions part 2

### Video 16 - Events and Attributes

### Video 17 - Manual Data Binding

### Video 18 - Forms and Inputs

### Video 19 - Arrays in JSX

### Video 20 - Picking an Option

### Video 21 - BUild it: Visibility Toggle

## Section 4 - React Components
