const express = require('express');
const router  = express.Router();

const twilioFunction = (data) => {
  console.log('TODO: implement twilio: ', data);
}

module.exports = (db) => {

  router.get("/", (req, res) => {
    res.render("landing_page");
  });

  router.get("/payment", (req, res) => {

    //SELECT order details from db to display as summary

    //then, renders /payment with order summary and payment form
    res.render("payment");
  });

  router.post("/payment", (req, res) => {

    console.log('BODY: ', req.body)

    //SELECT order items & quantities, save to ONE STRING (for SMS)
    //Twilio logic goes here

  res.redirect("/confirmation");
  });

  router.get("/confirmation", (req, res) => {
    console.log('BODY: ', req.body)

    //todo: render hard-coded map
    //stretch: pull address from db to render map.

    res.render("confirmation");
  });



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
