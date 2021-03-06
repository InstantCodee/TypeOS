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

app.on('ready', async () => {
    let win: BrowserWindow = new BrowserWindow({width: 1300, height: 800});
    win.setFullScreen(false);
    win.loadURL(`file://${__dirname}/html/index.html`);

    // Set what's happen when the user exit the application
    process.on('exit', () => undefined);

})