const mongoose = require("mongoose");

// Connection URI
const uri = "mongodb://localhost:27017/Backend";

// Connect to the database
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
