-- Create tables
CREATE TABLE IF NOT EXISTS `users` (
    id int NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    username VARCHAR(64) NOT NULL,
    password VARCHAR(128) NOT NULL,
    PRIMARY KEY (id)
);

-- Insert dummy users
INSERT OR REPLACE INTO `users` (id, firstName, lastName, username, password) VALUES
    (1, 'John', 'Doe', 'MrJohn_Doe1995', '3bf1023ac3d75c04452f9d66b2417fdbd89720a18e24ae41966e74b410945278f12167d56ca16507e4d6116f3214d755bed9c6055e346e6a2ce645a8a80426bf'),  -- Password: typeos
    (2, 'Nicolas', 'Klier', 'Mondei1', '7ff660722b3decd5ea144ebde144bfe0afe9f6229c28b869c3c5a6476cdabfab6ab150c3b85d79e06fada38d715e14d8aac3622ded8f9a57ab40f89055e52c71')     -- Password: secretPWs