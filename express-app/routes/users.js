const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydb.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT)`);

    db.get("SELECT count(*) as count FROM users", (err, row) => {
        if (row && row.count === 0) {
            db.run("INSERT INTO users (name) VALUES (?), (?)", ["Чекашева Юля", "Никита Тюлькин"]);
        }
    });
});

router.get('/', function(req, res, next) {
    db.all("SELECT id, name FROM users", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ items: rows }); 
    });
});

router.get('/:id', function(req, res, next) {
    const userId = parseInt(req.params.id);
    db.get("SELECT id, name FROM users WHERE id = ?", [userId], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "User not found" });
        res.json(row);
    });
});

router.post('/', function(req, res, next) {
    const { name } = req.body;
    db.run("INSERT INTO users (name) VALUES (?)", [name], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, name: name });
    });
});

module.exports = router;