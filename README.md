# wd-markdown-reborn
This is an Electron tutorial app salvaged from a WebDesigner magazine article. The article's download did not supply a working app, but did supply a 95% gist of some apparently interim version of the code. 

This app is a multi-tabbed markdown editor that uses Ace editor in edit mode and Marked in view mode. Use this app to see what you can do with Electron and as a starting point to expand the editor features.

Bootstrap and jQuery are installed via bower until I can figure how to bring it all under npm. When I installed from npm, jQuery no works.
 
Follow [@ElectronJS](https://twitter.com/electronjs) on Twitter for important
announcements. Visit the [electron website](http://electron.atom.io).

## Using

You can build it yourself (see below).

## Building

You'll need [Node.js](https://nodejs.org) installed on your computer in order to build this app.

```bash
$ git clone https://github.com/electron/electron-api-demos
$ cd electron-api-demos
$ npm install
$ npm start
```

For easier developing you can launch the app in fullscreen with DevTools open:

```bash
$ npm run dev
```
 
