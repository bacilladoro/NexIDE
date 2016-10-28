//'use strict'
const fs = require('fs');
const path = require('path');
const electron = require('electron')
const globalShortcut = require('electron').globalShortcut;
// Module to control application life.
const app = electron.app

const {Menu, MenuItem} = electron;

const template = [
  {
    label: 'File',
    submenu:[
      {
        label: 'Save',
        accelerator : 'CmdOrCtrl+S',
        role: 'save'
      },
      {
        label: 'Open',
        accelerator : 'CmdOrCtrl+O',
        role: 'open'
      }
    ]

  },

  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
      },
      {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
      },
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
      },
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
      },
      {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall'
      },
    ]
  },
  {
    label: 'Window',
    role: 'window',
    submenu: [
      {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      },
      {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      },
    ]
  },
  {
    label: 'Help',
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click() { require('electron').shell.openExternal('http://thenexio.com'); }
      },
      {
        label: 'Tutorials',
        click() { require('electron').shell.openExternal('http://thenexio.com/tutorials'); }
      },
    ]
  },
];

if (process.platform === 'darwin') {
  const name = require('electron').remote.app.getName();
  template.unshift({
    label: name,
    submenu: [
      {
        label: 'About ' + name,
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        label: 'Services',
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        label: 'Hide ' + name,
        accelerator: 'Command+H',
        role: 'hide'
      },
      {
        label: 'Hide Others',
        accelerator: 'Command+Alt+H',
        role: 'hideothers'
      },
      {
        label: 'Show All',
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() { app.quit(); }
      },
    ]
  });
  // Window menu.
  template[3].submenu.push(
    {
      type: 'separator'
    },
    {
      label: 'Bring All to Front',
      role: 'front'
    }
  );
}

const menu = Menu.buildFromTemplate(template);

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1024, height: 650,minWidth:1024,minHeight:650 })

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html')
  mainWindow.setMenu(menu);

  //Global Shortcuts on Focus of the Window
  mainWindow.on('focus',function(e){
    e.preventDefault();
    console.log("FOCUSED FOCUSED");
    const ret = globalShortcut.register('CommandOrControl+S', () => {
      try {
        if(BrowserWindow.getFocusedWindow().id==1){
          console.log('Ctrl+S pressed');
          BrowserWindow.getFocusedWindow().webContents.executeJavaScript("$('#save').trigger('click');")
        }
      }
    catch(err) {globalShortcut.unregisterAll()}
    });

    if (!ret) {
      console.log('registration failed');
    }

    // Check whether a shortcut is registered.
    console.log(globalShortcut.isRegistered('CommandOrControl+S'));
  });
  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

//Global Shortcuts
app.on('will-quit', () => {
// Unregister all shortcuts.
  globalShortcut.unregisterAll();
});
//----------------------------//

// In main process. Communication with renderer process
//open Terminal
const ipcMain = electron.ipcMain;
ipcMain.on('asynchronous-message', (event, arg) => {
  if(arg =='terminal'){
    console.log('terminal opening'); //for debugging
//,maxWidth :700,maxHeight:400,resizable:false
console.log(globalShortcut.isRegistered('CommandOrControl+S'));
    let termWin = new BrowserWindow({width: 715, height: 400,minWidth:715,minHeight:400});
    //win.webContents.openDevTools() //for debugging
    termWin.on('closed',function(){
      win = null;
    });
    termWin.loadURL('file://' + __dirname + '/terminal.html');

    termWin.show();
}
  event.sender.send('asynchronous-reply', 'terminal Opened');
});
//open Firmware
ipcMain.on('asynchronous-message', (event, arg) => {
  if(arg =='firmware'){
    console.log('firmware page opening'); //for debugging
//,maxWidth :700,maxHeight:400,resizable:false
    let firmWin = new BrowserWindow({width: 560, height: 580,minWidth:560,minHeight:580});
    //win.webContents.openDevTools() //for debugging
    firmWin.on('closed',function(){

      firmWin = null;
    });
    firmWin.loadURL('file://' + __dirname + '/firmware.html');
    //firmWin.webContents.openDevTools()

    firmWin.show();
}
  event.sender.send('asynchronous-reply', 'firmware page Opened');
});
//------------------------------------------------------//

//open Tutorials
ipcMain.on('asynchronous-message', (event, arg) => {
  if(arg =='tutorial'){
    console.log('tutorial page opening'); //for debugging
//,maxWidth :700,maxHeight:400,resizable:false
    let tutWin = new BrowserWindow({width: 800, height: 580,minWidth:800,minHeight:580});
    //win.webContents.openDevTools() //for debugging
    tutWin.on('closed',function(){

      tutWin = null;
    });
    tutWin.loadURL("https://nodemcu.readthedocs.io/en/master/");
    //firmWin.webContents.openDevTools()

    tutWin.show();
}
  event.sender.send('asynchronous-reply', 'tutorial page Opened');
});
//------------------------------------------------------//


// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
