const express = require('express');
const router  = express.Router();

const twilio = (data) => {
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
    db.query('INSERT')
      .then(res => {
        twilio(data);
        res.redirect("/confirmation");
      })

    const address = req.body.address

    res.send(address);

  });

  return router;
}
