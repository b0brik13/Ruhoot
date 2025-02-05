const sqlite3 = require('sqlite3').verbose();

// Открытие базы данных (файл создается автоматически, если не существует)
const db = new sqlite3.Database('./quiz.db');

// Создание таблицы с вопросами
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
