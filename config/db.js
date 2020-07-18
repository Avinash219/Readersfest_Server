const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/readersFest", { useNewUrlParser: true })
    .then(() => console.log("Database is connected"))
    .catch((err) => console.log(err))

