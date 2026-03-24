const express = require('express');
const router = express.Router();

let users = [
  { id: 1, name: "Чекашева Юля" },
  { id: 2, name: "Никита Тюлькин" }
];

router.get('/', function(req, res, next) {
  res.json({ items: users });
});

router.get('/:id', function(req, res, next) {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  res.json(user);
});

router.post('/', function(req, res, next) {
  const { name } = req.body;

  console.log(name)
  
  const newUser = {
    id: users.length + 1, 
    name: name
  };
  
  users.push(newUser);
  
  res.status(201).json(newUser);
});

module.exports = router;