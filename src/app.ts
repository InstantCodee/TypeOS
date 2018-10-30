/*  This file is part of TypeOS.

    TypeOS is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    TypeOS is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with TypeOS.  If not, see <http://www.gnu.org/licenses/>.
*/
import {app, BrowserWindow} from 'electron';
import {Data} from './js/data';

/* Tests */
import { UserTests } from '../tests/user';
import chalk from 'chalk';

export let database: Data = new Data(false);

// Running test suit If wanted.
if(process.argv.indexOf("--test") > 0) {
    console.log (chalk.blue("Entering test suite ...\n"));
    console.log (chalk.bold("Running user tests ..."))
    console.log ("=====================================")
    new UserTests ().loop();
} else {
    app.on('ready', async () => {
        let win: BrowserWindow = new BrowserWindow()
        win.setFullScreen(true)
        win.loadURL(`file://${__dirname}/html/index.html`);
    
        // Set what's happen when the user exit the application
        process.on('exit', () => database.db.close());
    })
}