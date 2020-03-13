const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM order_items;`)
      .then(data => {
        const order_item = data.rows;
        res.json( order_item );
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.post("/", (req, res) => {
    res.redirect('/payment')

  });
  return router;
};


