const express = require('express');
const router  = express.Router();

const twilioFunction = (data) => {
  console.log('TODO: implement twilio: ', data);
}

module.exports = (db) => {

  router.get("/", (req, res) => {
    console.log(req.body)
    //SELECT menu detail from db
    //render landing page with menu items
    res.render("landing_page");
  });

  //Submit button on landing page makes POST request to "/api/orders" (/orders.js)
  //POST request has contents of order calculator
  //"/api/order" handles database INSERTS, the redirects to "/payment"

  router.get("/payment", (req, res) => {
    console.log(req.body)

    //SELECT order details from db to display as summary
    //then, renders "/payment" with order summary and payment form
    res.render("payment");
  });

//Submit button on payment form creates POST request to "/api/twilio"
//twilio sends SMS then redirects to "/confirmation"

  router.get("/confirmation", (req, res) => {
    console.log('BODY: ', req.body)

    //todo: render hard-coded map
    //stretch: pull address from db to render map.

    res.render("confirmation");
  });


  ///THIS ROUTE SHOULDN"T BE NECESSARY:
  router.post("/confirmation", (req, res) => {
    console.log('BODY: ', req.body)

    // save data to ... tab le
    // const data = req.body...
    const address = req.body.address
    // db.query(`INSERT INTO address (address) VALUES ($1), [address];`)
    //   .then(res => {
    //     twilioFunction(data);
    //     res.redirect("/confirmation");
    //   })
    res.send(address);
  });

  return router;
}
