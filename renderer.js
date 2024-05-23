const { ipcRenderer } = require('electron');

 var textBox = document.querySelector('#text');

document.querySelector('#saveButton').addEventListener('click', () => {
    ipcRenderer.send('file-request', textBox.value);
})

document.querySelector('#openFileButton').addEventListener('click', () => {
    ipcRenderer.send('open-file-request');
})