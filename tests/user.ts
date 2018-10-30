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
import { Data } from '../src/js/data';
import * as chalk from 'chalk';
import * as path from 'path';
import * as jwt from 'jsonwebtoken';
import { isNullOrUndefined } from 'util';
import { CONFIG } from '../config';

interface IOrder {
    name: string,
    test: Function
}

// Starting by make a connection to the database first.
const db = new Data(true);

export class UserTests {
    order: Array<IOrder>;
    padding: string;

    constructor () {
        // Set test order
        this.order = [
            {
                name: "Create a user",
                test: this.createUser
            },
            {
                name: "Login as user",
                test: this.loginUser
            }
        ]

        // Padding is used when writing in the same line to override text comes after the new text.
        this.padding = "                           ";
    }

    async loop () {
        for(let i = 0; i < this.order.length; i++) {
            const test: Function = this.order[i].test;
            const stage: number = i+1;
            const name: string = this.order[i].name;

            // Tell the user that the test started.
            process.stdout.write("\r[ Test " + chalk.default.bold(String(stage)) + " of " + this.order.length + " ] " +
            chalk.default.bold(name));

            // Start test
            const startTime = Date.now();
            const err: Error = await test ();
            const endTime = Date.now();

            // Check if test failed.
            if (isNullOrUndefined(err)) {
                process.stdout.write (" " + chalk.default.bold(chalk.default.green("Worked ✔ (" + (endTime-startTime) + "ms)")) + this.padding + "\n");
            } else {
                process.stdout.write (" " + chalk.default.bold(chalk.default.redBright("Failed: " + name)) + this.padding + "\n" + err.stack);
                process.exit(1);
            }
        }
        process.exit(0);
    }

    // First test, create user.
    async createUser (): Promise<Error> {
        return new Promise<Error> (async (resolve, reject) => {
            try {
                // Test If we can create a new user.
                await db.addUser({
                    firstName: 'Dummy',
                    lastName: 'User',
                    username: 'UnitTest',
                    password: '123'
                }, {
                    lang: 'en',
                    lightMode: false,
                    temperatureType: 0
                });
            } catch (err) {
                resolve (err);
            }
            resolve (undefined)
        })
    }

    // Next, try to login.
    async loginUser (): Promise<Error> {
        return new Promise<Error>(async (resolve, reject) => {
            try {
                // Try to login
                jwt.verify(await db.login ("UnitTest", "123"), CONFIG.JWTKey)
            } catch (err) {
                resolve (err);
            }
            resolve (undefined);
        })
    }
}