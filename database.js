const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./quiz.db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject TEXT NOT NULL,
            question TEXT NOT NULL,
            options TEXT NOT NULL,
            correct INTEGER NOT NULL
        )
    `);
});

module.exports = db;
