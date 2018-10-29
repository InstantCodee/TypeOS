/**
 * This is the configuration file of TypeOS. Here, you can change
 * some stuff, like: JWT-Key or salt rounds.
 */

export interface IConfig {
    JWTKey: string,
    saltRounds: number
}
export const CONFIG: IConfig = {
    /* Create a random password (about 32 characters will do it).
       You can use this site as example: http://passwordsgenerator.net/ */
    JWTKey: "Secret_Password_And_Nobody_Should_Know_This_LOOONG_Key",

    /* Be carefull with that. Because If you put it too high, it will
       be impossible to login, because your computer very long. You're
       good to go with 12.

       Read more here: https://www.npmjs.com/package/bcrypt#a-note-on-rounds
    */
    saltRounds: 12
}