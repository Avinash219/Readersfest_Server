const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

const authRoutes = require('./routes/authRoutes');

const app = express();
require("./config/db");
require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(cors());


app.use("/api/auth", authRoutes);

const PORT = 8000;
app.listen(PORT, () => {
    console.log("Listening to Port 4200");
})