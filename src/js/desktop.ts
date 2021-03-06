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

export class Desktop {
    private element: HTMLElement;

    constructor () {
        this.element = <HTMLElement> document.createElement ("div");
        this.element.className = "desktop";

        let template = fs.readFileSync (path.join (__dirname, "../html/desktop.html"), "utf8");
        this.element.innerHTML = template;
    }

    getElement () {
        return this.element;
    }
}