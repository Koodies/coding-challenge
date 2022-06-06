require('dotenv').config()
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require('./src/lib/passport')
const mongoConnect = require('./src/lib/mongoConnect')

const usersRouter = require("./routes/users");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize);

app.use("/users", usersRouter);

mongoConnect.connectDB(process.env.MONGOCONNECTIONURL, (err) => {
  if (err) console.log(err);
});

module.exports = app;
