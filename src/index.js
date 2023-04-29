// Third party module
const express = require("express");
const app = express();  //constants
const bodyParser = require("body-parser");   //core module
const port = 8080;
const path = require('path')

// Body Parser middleware to parse request bodies
app.use(
    bodyParser.urlencoded(
        { extended: false }));

app.use(bodyParser.json());

const { connection } = require("./connector");
const cors = require('cors')  // Third party module
app.use(cors())


// Start server
app.listen(port, () => console.log(`App listening on port ${port}!`));

app.use("/api/booking")

module.exports = app;   