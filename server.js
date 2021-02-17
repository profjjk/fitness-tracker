// DEPENDENCIES
// =============================================================
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
// const db = require("./models");


// CONFIGURE EXPRESS
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Log HTTP requests and errors.
app.use(logger("dev"));

// Body parsers.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory.
app.use(express.static("public"));

// Database connection.
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });


// ROUTES
// =============================================================
// require("./routes/api-routes.js")(app);
require('./routes/html-routes.js')(app);


// START EXPRESS
// =============================================================
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});