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

export class Setup {
    private domelement: HTMLElement;

    getElement(): HTMLElement {
        return this.domelement;
    }

    constructor() {
        this.domelement = document.createElement ("div");
        this.domelement.innerHTML = fs.readFileSync (path.join(__dirname, "../html/setup.html"), "utf8");
    }
}