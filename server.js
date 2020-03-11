require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 3000;
const ENV = process.env.ENV || "development";
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/styles",
  sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: "expanded"
  })
);
app.use(express.static("public"));
app.use("/semantic", express.static(__dirname + "/semantic/dist"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const menuRoutes = require("./routes/menu");
const routes = require("./routes/routes");
const addressRoutes = require("./routes/address");
const ordersRoutes = require("./routes/orders");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/api/menu", menuRoutes(db));
app.use("/api/address", addressRoutes(db));
app.use("/api/orders", ordersRoutes(db));
app.use("/", routes(db));
// Note: mount other resources here, using the same pattern above

// ***ROUTES MOVED TO ./routes/routes.js

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
