const express = require("express");
const router = express.Router();


module.exports = db => {
   //Submit button on "/payment" creates POST request to "/payment"
   router.post("/", (req, res) => {


    console.log('BODY: ', req.body)
    //SELECT order items & quantities, save to ONE STRING (for SMS)
    //OR send order summary as string in req.body
    //***Twilio logic goes here

    //can also pull address from req.body.address here if necessary

  res.redirect("/confirmation");
  });

  return router;
}
