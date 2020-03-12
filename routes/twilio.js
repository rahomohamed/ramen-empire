const express = require("express");
const app = express();
const router = express.Router();



const twilio = require('twilio');
const MessagingResponse = require('twilio').twiml.MessagingResponse;


require('dotenv').config(); //to pull .env

//nodemodules/twilio/lib/rest/Twilio.js

// Load configuration information from system environment variables.
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER,
    CUSTOMER_PHONE_NUMBER= process.env.CUSTOMER_PHONE_NUMBER,
    RESTAURANT_PHONE_NUMBER = process.env.RESTAURANT_PHONE_NUMBER;


// Create an authenticated client to access the Twilio REST API
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);


module.exports = db => {
   //Submit button on "/payment" creates POST request to "/payment"
   router.post("/", (req, res) => {


    console.log('BODY: ', req.body.address)

      client.messages.create({
        to: RESTAURANT_PHONE_NUMBER,
        from: TWILIO_PHONE_NUMBER,
        body: `New order: ${req.body.address}.\nPlease respond with ETA as numerical value in MINUTES.`
      })
      .then(function(message) {
       // console.log('this is the then message: ', message);
        res.redirect('/confirmed');
      })
      .catch(error => res.status(500).send(error));


  res.redirect("/confirmation");
  });

  return router;
}
