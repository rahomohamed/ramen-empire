const express = require('express');
const router  = express.Router();

const twilioFunction = (data) => {
  console.log('TODO: implement twilio: ', data);
}

module.exports = (db) => {

  router.get("/", (req, res) => {
    console.log(req.body)
    res.render("landing_page");
  });

  //Submit button on landing page makes POST request to "/api/orders" (/orders.js)
  //POST request has contents of order calculator
  //"/api/order" handles database INSERTS, the redirects to "/payment"

  router.get("/payment", (req, res) => {
  res.render("payment");
  });


//Submit button on payment form creates POST request to "/api/twilio"
  router.get("/confirmation", (req, res) => {

    res.render("confirmation");
  });

  router.post("/confirmation", (req, res) => {
 const address = req.body.address
   res.send(address);
  });

  return router;
}
