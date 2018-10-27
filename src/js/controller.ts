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
    
import * as fs from 'fs';
import * as path from 'path';
import { ErrorScreen } from '../js/errorscreen';

class Controller {
    searchPath = "~/.local/share/typeos/apps/";
    domelement: HTMLElement | null = null;

    constructor () {
    }

    async openApp (appId: string): Promise<HTMLElement> {
        return new Promise<HTMLElement> (resolve => {
            var appfolder = "";
            if (fs.existsSync(path.join(this.searchPath, appId, "package.json"))) { // Script path for current widget
                appfolder = path.join(this.searchPath, appId);
            }
            if (appfolder != "") {
                // Loads the entry point of the target view
                import(appfolder).then(async appLoader => {
                    this.domelement = document.createElement("div"); // ... create the widget with the current id.
                    this.domelement.appendChild(await appLoader["default"](appfolder)); // Append the script's result in the current widget's container.
                    console.log (document.getElementById("appcontainer"));
                    resolve (this.domelement); // Return new div element
                }).catch(error => {
                    console.error("Cannot launch app! " + appId);
                    console.log(error);
                    resolve (new ErrorScreen (error).get_element ());
                });
            }
            console.log("App not installed: " + appId);
            resolve (new ErrorScreen ("App not installed: " + appId).get_element ());
        })
}
}

var controller = new Controller ();
async function get_exception () {
    document.getElementById("appcontainer")!.innerHTML = "";
    document.getElementById("appcontainer")!.appendChild (await controller.openApp ("com.typeos.store"));
}