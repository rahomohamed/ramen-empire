const express = require('express');
const router  = express.Router();
module.exports = (db) => {


// generates unique id
function generateRandomString() {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

router.get("/payment", (req, res) => {
getUserWithOrder = function (order) {
return db.query(`SELECT * FROM orders
WHERE order = $1`, [order]).then(res => res.rows)
}
});
}
