import {app, BrowserWindow} from 'electron';
import {Data} from './js/data';

export let database: Data = new Data();

app.on('ready', () => {
    let win: BrowserWindow = new BrowserWindow()
    win.setFullScreen(true)
    win.loadURL(`file://${__dirname}/html/index.html`)

    // Set what's happen when the user exit the application
    process.on('exit', () => database.db.close());
})