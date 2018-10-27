import {app, BrowserWindow} from 'electron';

app.on('ready', () => {
    let win: BrowserWindow = new BrowserWindow()
    win.setFullScreen(true)
    win.loadURL(`file://${__dirname}/html/index.html`)
})