const express           = require("express");
const app               = express();
const router            = express.Router();
const twilio            = require('twilio');
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

    console.log('BODY FROM TWILIO ROUTE: ', req.body.address)
      client.messages.create({
        to: CUSTOMER_PHONE_NUMBER,
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


//Helper Function to send text reminding customer to leave CAN BE TEXT OR CALL
const consfirmTimeUntilDeparture = function(reminderTime) {
  client.messages.create({
    to: CUSTOMER_PHONE_NUMBER,
    from: TWILIO_PHONE_NUMBER,
    body: `You should leave to pick up your order in ${reminderTime} minutes!`
  }).then((message)=> console.log('from customer ETA .THEN ', message.body));
};

// Helper Function to send reminder SMS for customer to leave when timer is up:
const timedReminderToLeave = function(reminderTime) {
  console.log(`timer started for ${reminderTime} minutes`);

  setTimeout(() => {
    client.messages.create({
      to: CUSTOMER_PHONE_NUMBER,
      from: TWILIO_PHONE_NUMBER,
      body: `You should leave now to pick up your order!`
    }).then((message)=> console.log('REMINDER TO LEAVE SENT: ', message.body));
  }, reminderTime * 60000); // multiplies time until departure in minutes by 60000 to convert to milliseconds
};

//LISTEN FOR SMS  **DO NOT CHANGE THIS ROUTE NAME** it is configured as the webhook in Twilio account
router.post('/inbound', (req, res) => {

  const timeUntilReady = req.body.Body; //extract ETA in minutes from restaurant's SMS containing ETA confirmation
  const travelTime = 5; //(hard-coded) travel time to get to the restaurant, in minutes
  const reminderTime = timeUntilReady - travelTime;

  consfirmTimeUntilDeparture(reminderTime); //send SMS to tbe customer when they should plan to leave once restaurant confirms order
  timedReminderToLeave(reminderTime);  //starts timer that sends SMS to the customer when it's time to leave

  const twiml = new MessagingResponse();
  twiml.message('Thanks for confirming ETA!');
  res.writeHead(200, {'Content-Type': 'text/xml'}); //Response to HTTP POST request for restaurant confirming ETA, sends SMS back to restaurant

  console.log('TRIGGERED FROM INBOUND ROUTE!!: ', req.body.Body); //debugging

  res.end(twiml.toString()); //end response process
  });


return router;
}
