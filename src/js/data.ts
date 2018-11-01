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
import * as sqlite3 from 'better-sqlite3';
import * as fs from 'fs';
import * as path from 'path';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { CONFIG } from '../../config';
import chalk from 'chalk';

export interface IUserInfo {
    firstName: string,
    lastName: string,
    username: string,
    password: string
}
export interface IUserSettings {
    lightMode: boolean,
    lang: string,
    temperatureType: number
}

export class Data {
    db: any;

    /**
     * Executes migration on start.
     */
    constructor(test: boolean) {
        if (test) {
            this.db = new sqlite3.default('test.db', { memory: true });
        } else {
            this.db = new sqlite3.default('data.db');
        }
        // Migrate and create tables If not exist.
        this.db.exec(fs.readFileSync(path.join(__dirname, '../sql/migrate.sql'), 'utf8'));
    }

    /**
     * Add a new user to the database.
     * @param userInfo JSON object defines basic account information about user like password or username.
     * @param userSettings JSON object defines default settings about user.
     */
    async addUser(userInfo: IUserInfo, userSettings: IUserSettings) {
        // First check, If user already exist.
        const uSelect = this.db.prepare("SELECT id FROM `users` WHERE username=?").get(userInfo.username);
        if (uSelect != undefined) throw new Error("User " + userInfo.username + " already exist!");

        // Init  user settings
        const sInsert = this.db.prepare("INSERT INTO `settings` (lightMode, lang, temperatureType) VALUES (@lightMode, @lang, @temperatureType)");
        let sResult: any;   // Must do it 'any' because there is an error at the TypeScript definition by DefinitelyTyped.
                            // lastInsertROWID should be lastInsertRowid.

        // Set user settings
        sResult = sInsert.run({
            lightMode: this.boolToInt(userSettings.lightMode),
            lang: userSettings.lang,
            temperatureType: userSettings.temperatureType
        });

        // Create User
        const uInsert = this.db.prepare("INSERT INTO `users` (firstName, lastName, username, password, settings) VALUES" +
            "(@first, @last, @username, @password, @settings)");
        uInsert.run({
            first: userInfo.firstName,
            last: userInfo.lastName,
            username: userInfo.username,
            password: await this.cryptPassword(userInfo.password),
            settings: Number(sResult.lastInsertRowid)
        });
    }

    /**
     * Login as user
     * @param username Username of user
     * @param password Password of user
     * @return JWT Token
     */
    login(username: string, password: string): Promise<string> {
        return new Promise<string>(async (resolve, reject) => {
            // Grab user from database and select everything else.
            const sUser = this.db.prepare("SELECT * FROM `users` WHERE username=?").get(username);

            // Compare given password with hashed one from database.
            if (await this.comparePasswords(password, sUser.password)) {
                resolve(jwt.sign({
                    id: sUser.id,
                    firstName: sUser.firstName,
                    lastName: sUser.lastName,
                    username: sUser.username
                }, CONFIG.JWTKey));
            } else throw Error("Login credentials are wrong!");
        });
    }

    /**
     * Checks If the database is empty.
     * @returns true If the database is empty and false If not.
     */
    isEmpty(): Promise<boolean> {
        return new Promise<boolean> ((resolve, reject) => {
            const select = this.db.prepare("SELECT * FROM users, settings").all();
            resolve (select.length == 0 ? true : false);    // Return false If length is > 0 and true if == 0.
        })
    }

    /**
     * Hashes text with bcrypt asynchronously. Takes salt rounds from config.
     * @param password Plain password
     * @returns Hashed password
     */
    private cryptPassword(password: string): Promise<string> {
        return new Promise<string>(async (resolve, reject) => {
            resolve(await bcrypt.hash(password, CONFIG.saltRounds));
        })
    }

    /**
     * Compares the given password with that from the database.
     * @param password Plain text password.
     * @param hashedPassword Hashed password (from database).
     * @returns true If given password matches with that from the user.
     */
    private comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            // Return If result from database is empty.
            if (hashedPassword == null) resolve(false);

            // Resolve with true If the given password matches and false If not.
            resolve(await bcrypt.compare(password, hashedPassword));
        })
    }

    /**
     * Converts the input boolean into a number to store it into the database.
     * @param bool Your boolean you want to convert.
     * @returns The corresponding integer.
     */
    private boolToInt(bool: boolean): number {
        return bool ? 1 : 0;    // Return 1 If 'bool' is true and 0 If not.
    }
}