const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const twilio = require('twilio');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
require('dotenv').config(); //to pull .env

// nodemodules/twilio/lib/rest/Twilio.js

// Load configuration information from system environment variables.
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER,
    CUSTOMER_PHONE_NUMBER= process.env.CUSTOMER_PHONE_NUMBER,
    RESTAURANT_PHONE_NUMBER = process.env.RESTAURANT_PHONE_NUMBER;

// Create an authenticated client to access the Twilio REST API
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//HELPER FUNCTIONS
//**********************************
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

// HELPER function to send VOICE call reminder for customer to leave when timer is up:
const timedVoiceReminderToLeave = function(reminderTime) {
  console.log(`timer started for ${reminderTime} minutes`);

  setTimeout(() => {
    client.calls
      .create({
         twiml: '<Say><You should leave now to pick up your order!</Say><Play>http://demo.twilio.com/docs/classic.mp3</Play></Response>',
         to: CUSTOMER_PHONE_NUMBER,
         from: RESTAURANT_PHONE_NUMBER
      }).then(call => console.log('REMINDER CALL TO LEAVE SENT: ',call.sid));
  }, reminderTime * 60000);
};


// ROUTES
//********************************

// 1. render home page
app.get('/', function(req, res) {
// console.log('FROM GITHUB!!')
    res.render('index');
});


//2. CUSTOMER HITS CONFIRM ORDER / PAYMENT, creates post request to /message; 2. SERVER handles a POST request to send SMS to restaurant (sent via ajax on our home page)
app.post('/message', function(req, res) {
  // Use the REST client to send a text message
  client.messages.create({
    to: RESTAURANT_PHONE_NUMBER,
    from: TWILIO_PHONE_NUMBER,
    body: `New order: ${req.body.message}.\nPlease respond with ETA as numerical value in MINUTES.` // "%0a" encodes line break
    //'New Order Text Sent!'
  }).then(function(message) {
    // When we get a response from Twilio, respond to the HTTP POST request
    res.redirect('/confirmed');
  });
});


//**********************************
//3. RENDERS ORDER CONFIRMATION PAGE W MAP
app.get('/confirmed', function(req, res, next) {
  res.render('confirmation');
});


//**********************************
//4. LISTEN FOR SMS  **DO NOT CHANGE THIS ROUTE NAME** it is configured as the webhook in Twilio account
app.post('/inbound', (req, res) => {

  const timeUntilReady = req.body.Body; //extract ETA in minutes from restaurant's SMS containing ETA confirmation
  const travelTime = 5; //(hard-coded) travel time to get to the restaurant, in minutes
  const reminderTime = timeUntilReady - travelTime;

  consfirmTimeUntilDeparture(reminderTime); //send SMS to tbe customer when they should plan to leave once restaurant confirms order
  //timedReminderToLeave(reminderTime);  //starts timer that sends SMS to the customer when it's time to leave
  timedVoiceReminderToLeave(reminderTime); // starts timer that sends voice call to the customer when it's time to leave

  const twiml = new MessagingResponse();
  twiml.message('Thanks for confirming ETA!');
  res.writeHead(200, {'Content-Type': 'text/xml'}); //Response to HTTP POST request for restaurant confirming ETA, sends SMS back to restaurant

  console.log('TRIGGERED FROM INBOUND ROUTE!!: ', req.body.Body); //debugging

  res.end(twiml.toString()); //end response process
});


// ERROR HANDLING
// **********************************
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
// set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
  res.status(err.status || 500);
  res.render('error');
});
