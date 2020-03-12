const express = require("express");
const router = express.Router();


module.exports = db => {
   //Submit button on "/payment" creates POST request to "/payment"
   router.post("/", (req, res) => {

    console.log('BODY: ', req.body)
    //SELECT order items & quantities, save to ONE STRING (for SMS)
    //Twilio logic goes here

  res.redirect("/confirmation");
  });

  return router;
}
