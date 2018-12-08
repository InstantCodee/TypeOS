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
import { Desktop } from '../js/desktop';
import { Setup } from '../js/setup';
import { Data } from '../js/data';

/**
 * The controller manages the dynamic content eg.: Desktop and Chat application
 */
class Controller {
    searchPath = "~/.local/share/typeos/apps/";
    db = new Data(false);
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
                    this.overrideApp(this.domelement);
                    resolve (this.domelement); // Return new div element
                }).catch(error => {
                    console.error("Cannot launch app! " + appId);
                    console.log(error);
                    document.getElementById("appcontainer")!.appendChild (new ErrorScreen (error).get_element ());
                    resolve (new ErrorScreen (error).get_element ());
                });
            }
            console.log("App not installed: " + appId);
            resolve (new ErrorScreen ("App not installed: " + appId).get_element ());
        });
    }

    openDesktop () {
        this.overrideApp(new Desktop().getElement());
    }

    openSetup () {
        console.log ("Display setup...")
        if (this.db.isEmpty()) {
            this.overrideApp(new Setup().getElement());
        }
    }

    /**
     * Override the content in 'appcontainer' with new app.
     */
    overrideApp(html: HTMLElement) {
        document.getElementById("appcontainer")!.innerHTML = "";
        document.getElementById("appcontainer")!.appendChild (html);
    }
}

var controller = new Controller ();
async function get_exception () {
    controller.overrideApp (await controller.openApp ("com.typeos.store"));
}

function desktop () {
    controller.openDesktop ();
}
function openSetup () {
    controller.openSetup();
}