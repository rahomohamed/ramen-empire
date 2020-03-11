const express = require('express');
const router  = express.Router();


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
res.redirect("/confirmation");
});

module.exports = router;
