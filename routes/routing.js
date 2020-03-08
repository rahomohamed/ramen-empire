

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//SETTING UP MIDDLEWARE:
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));


//TWILIO ACCOUNT DETAILS (should be set in .env variables, msg for details)
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);


//render home page
app.get("/", (req, res) => {

  res.render('landing_page');
});

//render checkout page
app.get("/checkout", (req, res) => {
  res.render('checkout');
});


// CUSTOMER HITS CONFIRM ORDER / PAYMENT button on checkout page, creates post request to /message

app.post('/message', function(req, res, next) {
  // Use the Twilio REST client to send a text message
  client.messages.create({
    to: '+12266788585',
    from: TWILIO_PHONE_NUMBER,
    body: req.body.message
    //'New Order Text Sent!'
  }).then(function(message) {
    // When we get a response from Twilio, respond to the HTTP POST request
    res.redirect('/confirmed');
  });
});

//RENDER ORDER CONFIRMATION PAGE WITH MAP
app.get('/confirmed', (req, res) => {
  res.render('confirmation');
});


//LISTEN FOR SMS confirmation from restaurant **NEED TO CONFIGURE ROUTE ON VALID DOMAIN / SERVER / DOES NOT WORK ON LOCALHOST
app.post('/inbound', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('Thanks for confirming ETA!');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});



//Remind Custonmer to leave // CAN BE configured as TEXT OR CALL // Belongs in separate file as helper function
const remindCustomerToLeave = function() {
  client.messages.create({
    to: '+12266788585', //CHANGE TO ADD 2nd PHONE NUMBER;
    from: TWILIO_PHONE_NUMBER,
    body: 'You should leave to pick up your order now!'
  }).then((message)=> console.log(message.sid));
};
