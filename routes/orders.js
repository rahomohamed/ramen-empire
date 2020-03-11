const express = require("express");
const router = express.Router();

// todo: replace with session.user_id once implented
const userId = 1;

module.exports = db => {
  router.post("/", (req, res) => {
    const referenceNumber = new Date().getTime();
    const readyTime = 15;

    db.query(`
      INSERT INTO orders
        (user_id, reference_number, ready_time)
      VALUES ($1, $2, $3);`,
      [userId, referenceNumber, readyTime])
      .then(data => {
        const order = data.rows;
        // return db.query(`INSERT INTO order_items (order_id) VALUES ($1)`, [order.id]);
      }).then(data => {
        //  call twilio
        res.json(data.rows); // order items
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
