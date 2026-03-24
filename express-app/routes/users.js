const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  const usersResponse = {
    items: [
      { id: 1, name: "Чекашева Юля" },
      { id: 2, name: "Никита Тюлькин" }
    ]
  };
  
  res.json(usersResponse);
});

module.exports = router;