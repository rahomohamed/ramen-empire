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
    res.render("payment");
  });

  router.post("/payment", (req, res) => {
  res.redirect("/payment");
  });

  router.get("/confirmation", (req, res) => {
    res.render("confirmation");
  });

  router.post("/confirmation", (req, res) => {
    // save data to ... tab le
    // const data = req.body...
    const address = req.body.address

    db.query(`
      INSERT INTO address (address)
      VALUES ($1), [address];`)

      .then(res => {
        twilioFunction(data);
        res.redirect("/confirmation");
      })

    res.send(address);

  });

  return router;
}
