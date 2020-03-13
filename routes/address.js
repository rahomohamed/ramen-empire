const express = require("express");
const router = express.Router();

module.exports = db => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM address;`)
      .then(data => {
        const address = data.rows;
        res.json(address);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};

