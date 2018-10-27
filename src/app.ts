import {app, BrowserWindow} from 'electron';
let win: BrowserWindow = null;

app.on('ready', () => {
    win = new BrowserWindow()
    win.setFullScreen(true)
})