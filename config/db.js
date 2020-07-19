const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:COVNALLY1@readersfest.9qald.mongodb.net/readersfest?retryWrites=true&w=majority", { useNewUrlParser: true })
    .then(() => console.log("Database is connected"))
    .catch((err) => console.log(err))

