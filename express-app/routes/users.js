const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name text)`);

let users = [
  { id: 1, name: "Чекашева Юля" },
  { id: 2, name: "Никита Тюлькин" }
];

router.get('/', function(req, res, next) {
  db.all("SELECT id, name FROM users", [], (err, rows) => {
      if (err) {
         console.log(err);
      } else {
         res.json({ items: users });
      }
   });
});

router.get('/:id', function(req, res, next) {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  res.json(user);
});

router.post('/', function(req, res, next) {
  const { name } = req.body;

  const insert = "INSERT INTO users (name) VALUES (?)";
  db.run(insert, [name]);
  
  console.log(name)
  
  const newUser = {
    id: users.length + 1, 
    name: name
  };
  
  users.push(newUser);
  
  res.status(201).json(newUser);
});

module.exports = router;