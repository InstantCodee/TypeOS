/*
    This file is part of TypeOS.

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
-- Create tables
-- User table
CREATE TABLE IF NOT EXISTS `users` (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    username VARCHAR(64) NOT NULL,
    password VARCHAR(128) NOT NULL,
    settings INTEGER NOT NULL,
    FOREIGN KEY(settings) REFERENCES settings(id) ON DELETE CASCADE
);

-- Settings table to save user specific options
CREATE TABLE IF NOT EXISTS `settings` (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lightMode TINYINT NOT NULL DEFAULT 0,       -- 0 means dark and 1 means light
    lang VARCHAR(2) NOT NULL DEFAULT 'en',
    temperatureType TINYINT NOT NULL DEFAULT 0  -- 0 means °C and 1 means °F
);