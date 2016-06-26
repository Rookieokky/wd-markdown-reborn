const electron = require('electron');
const {ipcRenderer} = electron;

var files = {};
var rollingId = 0;
var tabs = $('#fileTabs');
var panes = $('#filePanes');
var ActiveTab = function() {
  return id = tabs.find('.active a').attr('href').slice(1);
};

var FileNew = function(event, fPath, filename, filedata) {
  var fName = filename || 'new';
  var index = ++rollingId; 
  var id = 'file' + index;
  var pane = $('<div class="tab-pane fade">' +
    '<div class="editor"/><div class="preview">' +
    '<div class="container"/></div></div>');
  panes.append(pane.attr('id', id));
  var tab = $('<li><a data-toggle="tab"/></li>');
  tab.find('a').html(fName).attr('href', '#file' + index);
  tabs.append(tab);
  var content = pane.find('.editor').get(0);
  if (filename) content.innerHTML = filedata;
  var editor = ace.edit(content);
  editor.setTheme('ace/theme/monokai');
  editor.getSession().setMode('ace/mode/markdown');
  files[id] = {
    editor: editor, pane: pane, tab: tab,
    path: fPath, filename: fName,
    preview: pane.find('.preview')
  };
  tab.find('a').tab('show');
};
// end FileNew();
ipcRenderer.on('file-new', FileNew); 
ipcRenderer.on('file-open', FileNew);

var FileSave = function(keepPath) {
  var id = ActiveTab();
  ipcRenderer.send('file-save',
    files[id].editor.getValue(), id,
    keepPath ? files[id].path : null
  );
};

  
ipcRenderer.on('file-save', FileSave.bind(null, true));
ipcRenderer.on('file-save-as', FileSave.bind(null, false));
ipcRenderer.on('file-saved', function(id, filename, path) {
  files[id].path = path;
  files[id].tab.find('a').text(filename);
});
  
var FileClose = function() {
  var id = ActiveTab();
  var nextTab = files[id].tab.prev();
  if (nextTab.length === 0) nextTab = files[id].tab.next();
  files[id].editor.destroy();
  files[id].pane.remove();
  files[id].tab.remove();
  delete files[id];
  if (nextTab) nextTab.find('a').tab('show');
};
ipcRenderer.on('file-close', FileClose);

//step20//
 
ipcRenderer.on('view-toggle', function() {
  var id = ActiveTab();
  if (files[id].preview.is(':hidden'))
    files[id].preview.find('.container').html(
      marked(files[id].editor.getValue())
    );
  files[id].preview.slideToggle();
});
