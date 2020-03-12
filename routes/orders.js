const express = require("express");
const router = express.Router();

// todo: replace with session.user_id once implented
const userId = 1;

module.exports = db => {
  router.post("/", (req, res) => {
    //const referenceNumber = new Date().getTime();

    console.log('AFTER SUBMIT BUTTON: ', req.body);

    //req.body:
   // { '{"item1":"thing","item2":"thing2"}': '' }


    if ('RoutingStillNeedsWork' === false) {
    //Pull order details from req.body (example):
    const orderSummary = {
      item_id: req.body.menu_item_id,
      item_quantity: req.body.menu_item_id
    };
    // todo: parse order details so they can be inserted into database
    //Insert order details into db:
    db.query(`
      INSERT INTO order_items
        (menu_item_id, order_id, quantity)
      VALUES ($1, $2, $3),
      [1, 1, 2];`)
      .then(data => {
        const order = data.rows;
        res.send(order);
        //  console.log(data);
       res.redirect('/payment');
      })
      // .then(data => {
      //   //  call twilio
      //   res.json(data.rows); // order items
      // })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
    }

  res.redirect('/payment')

  });
  return router;
};
