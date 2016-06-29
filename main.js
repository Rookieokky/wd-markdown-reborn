const fs = require('fs');
const path = require('path');
const electron = require('electron');
// Module to control application life.
const {app} = electron;
// Module to create native browser window.
const {BrowserWindow} = electron;
const {dialog} = electron;
const {Menu} = electron;
const {ipcMain}  = electron;


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({width: 900, height: 700});

  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/app-root/index.html`);

  // Open the DevTools.
  win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
 
 // a brief word from our sponsor... this does not display in log, at least on windows(but renderer log msgs do)
console.log('index.js: app on ready, open devtools just ran');  
   
var OpenFile = function() { 
 dialog.showOpenDialog(win, {
  filters: [{name: 'Markdown', extensions: ['md', 'markdown']}],
  properties: ['openFile']
 }, function(paths) {
  if (!paths) return false; 
  var fPath = paths[0];
  var fName = path.basename(fPath);
  var fData = fs.readFileSync(fPath, 'utf8'); 
 
  // debuggy window pop
	   dialog.showMessageBox(win, {
	   title: 'index.js main process: ipc related arg values: ',
	   message:  "fPath: " + fPath + "\n fName: " + fName +	"\n fData: \n" +  fData ,
	   buttons: ["OK"]  
		 });
		 
  win.webContents.send('file-open', fPath, fName, fData);
 });
};
  
var SendEvent = function(name) {
 return function() {win.webContents.send(name);};
};

var template = [
 {label: 'File', submenu: [
  {label: 'New', click: SendEvent('file-new')},
  {label: 'Open', click: OpenFile},
  {label: 'Save', click: SendEvent('file-save')},
  {label: 'Save As', click: SendEvent('file-save-as')},
  {label: 'Close', click: SendEvent('file-close')},
  {type: 'separator'},
  {label: 'Quit', click: function() {app.quit();}}
 ]}, {label: 'View', submenu: [
  {label: 'HTML/Markdown', click: SendEvent('view-toggle')}
 ]}
];
Menu.setApplicationMenu(Menu.buildFromTemplate(template));


ipcMain.on('file-save', function(event, fData, id, type, fPath) {
  if (fPath) {
   return fs.writeFile(fPath, fData, function(err) {
    if (err) return console.error(err);
   });
  }
  dialog.showSaveDialog(win, {
   filters: [{
    name: 'Markdown', extensions: ['md', 'markdown']
   }]
  }, function(fPath) {
   if (fPath && fPath.length > 0) {
    fs.writeFile(fPath, fData, function(err) {
     if (err) return console.error(err);
     win.webContents.send('file-saved', id, path.basename(fPath), fPath);
    });
   }
  });
 }); 
