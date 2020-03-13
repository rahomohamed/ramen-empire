const express = require("express");
const router = express.Router();

// todo: replace with session.user_id once implented
const userId = 1;

module.exports = db => {
  router.post("/", (req, res) => {
    res.redirect('/payment')

  });
  return router;
};
