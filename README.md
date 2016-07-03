# wd-markdown-reborn
This is an Electron tutorial app salvaged from a WebDesigner magazine article. The article's download did not supply a working app, but did supply a 95% gist of some apparently interim version of the code. Some screenshots provided motivation and clues on how to glue it together.

This app is a multi-tabbed markdown editor that uses Ace editor in edit mode and Marked in view mode. 

Bootstrap and jQuery are installed via bower until I can figure how to bring it all under npm. When I installed them from npm, things fell apart. Perhaps related to the fact that jQuery is required by Bootstrap when installed with bower, but with npm they are independent installs.


## Using

Default app launches with Chromium DevTools open. Toggle between modes via the "View" menu.

## Building

You'll need [Node.js](https://nodejs.org) installed on your computer in order to build this app. Also Electron and bower.

```bash
$ npm install bower ( if not done yet )
$ git clone https://github.com/chilismaug/wd-markdown-reborn.git
$ cd wd-markdown-reborn
$ npm install
$ bower install
$ npm start
```

Follow [@ElectronJS](https://twitter.com/electronjs) on Twitter for important
announcements. Visit the [electron website](http://electron.atom.io).
