const { app, BrowserWindow } = require('electron/main')
const {Menu} = require('electron');
const path = require('node:path');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'script.js')
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
        {label: 'Save'},
        {label: 'Save as'}, 
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
    // Add more menus (View, Window, Help) with desired items and functionalities
  ];

function configureMenuTemplate(){
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  }

  function darkModeToggle(){

  }