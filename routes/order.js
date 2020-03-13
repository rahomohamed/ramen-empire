const express = require('express');
const router  = express.Router();
module.exports = (db) => {


// generates unique id
// function generateRandomString() {
//   let result = "";
//   const characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   const charactersLength = characters.length;

//   for (let i = 0; i < 6; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
// }

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM order_items;`)
      .then(data => {
        const order_item = data.rows;
        res.json( order_item );
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

}
