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

export class ErrorScreen {
    private element: HTMLElement;

    constructor (message: string) {
        this.element = <HTMLElement> document.createElement ("div");
        this.element.style.position  = "absolute";
        this.element.style.top       = "50%";
        this.element.style.left      = "0";
        this.element.style.right     = "0";
        this.element.style.transform = "translate(0, -50%)";
        this.element.style.textAlign = "center";

        var title = document.createElement ("h1");
        title.innerHTML = "ooops, you shouldn't be seeing this screen :p";
        title.style.fontSize      = "32px";
        title.style.paddingBottom = "40px";
        title.style.fontWeight    = "300";
        title.className           = "type-active";
        this.element.appendChild (title);

        var mainmsg = document.createElement ("h3");
        mainmsg.innerHTML = "For reporting this bug, here is the problem: \"" + message + "\"";
        mainmsg.style.fontWeight = "400";
        mainmsg.className        = "type-inactive";
        this.element.appendChild (mainmsg);
    }

    get_element (): HTMLElement {
        return this.element;
    }
}