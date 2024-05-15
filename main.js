const { app, BrowserWindow } = require('electron/main')
const {Menu, clipboard} = require('electron');
const path = require('node:path');
const { dialog } = require('electron');
const fs = require('fs');
const {ipcMain} = require('electron');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'script.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
  configureMenuTemplate()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

const template = [
    {
      label: 'File',
      submenu: [
        {label: 'Save', click: () => saveFile()},
        {label: 'Save as', click: () => saveFile()}, 
        {label: 'Open File Location'}
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Font', click: () => console.log('Change font modal') },
      ],
    },
    {
        label: 'Settings',
        submenu:[
            {label: 'Dark Mode', click: () => darkModeToggle()},
        ]
    },
  ];

function configureMenuTemplate(){
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  }

  function darkModeToggle(){

  }

ipcMain.on('file-request', (event, data) => {
  console.log(data);
    dialog.showSaveDialog({
      title: '',
      defaultPath: '',
      buttonLabel: 'Save Note',
      filters: [
          {
              name: 'Text Files',
              extensions: ['txt', 'docx']
          },],
      properties: []
  }).then(file => {
      console.log(file.canceled);
      if (!file.canceled) {
          fs.writeFile(file.filePath.toString(),
          "textValue", function (err) {
                  if (err) throw err;
                  console.log('Saved!');
              });
      }
  }).catch(err => {
      console.log(err)
  });
});