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
    errorMessages: Array<string> = [
        "ooops, you shouldn't be seeing this screen :p",
        "Something went terribly wrong.",
        "Error ¯\\_(ツ)_/¯",
        "It's not our fault, your computer is to blame.",
        "What have you done? ಠ╭╮ಠ",
        "That was planned, I think...",
        "What the fu**?!",
        "Ehmm, yeah... Something went wrong?",
        "Everything is fine",
        "Maybe it's our fault or yours.",
        "Sh*t, that was not intended.",
        "Ehmm, what? Something went wrong? I have to go ─=≡Σᕕ( ͡° ͜ʖ ͡°)ᕗ",
        "Web developers would say: 500 Internal Error",
        "The problem is usually 50cm in front of the screen.",
        "Error is: undefined. We can't even display an error ಥʖ̯ಥ",
        "It was Chuck Norris, I swear!",
        "At least your screen is not blue!",
        "Hey! It's not a bug, it's a feature!",
        "Report it at Por... sorry GitHub!",
        "Look! There is a flying elephant!",
        "The following lines are not for people under 1337 years.",
        "Following lines may contain swearwords for programmers.",
        "Be aware of sharing the following error. It can leads to crying programmers."
    ]
    rnd: number = Number((Math.random() * ((this.errorMessages.length-1) - 0) + 0).toFixed(0));

    constructor (message: string) {
        this.element = <HTMLElement> document.createElement ("div");
        this.element.style.position  = "absolute";
        this.element.style.top       = "50%";
        this.element.style.left      = "0";
        this.element.style.right     = "0";
        this.element.style.transform = "translate(0, -50%)";
        this.element.style.textAlign = "center";

        var title = document.createElement ("h1");
        title.innerHTML = this.errorMessages[this.rnd]; // Random error message
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
        console.log ("RND: ", this.rnd, "Len.:", this.errorMessages.length)
        return this.element;
    }
}