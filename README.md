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

### Video 9 - Setting up Babel

### Video 10 - Exploring JSX

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
