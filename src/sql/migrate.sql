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