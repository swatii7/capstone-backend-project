// Third party module
const express = require("express");
const app = express(); //constants
const bodyParser = require("body-parser"); //core module
const port = 8080;

const path = require("path");
const { connection } = require("./connector");

// Body Parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
const router = express.Router();
const cors = require("cors"); // Third party module
app.use(cors());

//get api for orders
app.get("/api/bookings", function (req, res) {
  try {
    //get last booking
    connection.findOne({}, {}, { sort: { _id: -1 } }, (error, data) => {
      if (error) {
        //it there is some error it will return error msg in response
        res.status(200).json({ error: error.message });
      } else {
        //respond send
        res
          .status(200)
          .json(
            data === null ? { message: "No Previous booking found" } : { data }
          );
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//post api for bookings insert data
app.post("/api/bookings", function (req, res) {
  const { movie, slot, seats } = req.body; //destructing
  //validation
  if (!movie || !slot || !seats) {
    res
      .status(400)
      .json({
        error: "Invalid Request, Please select a movie, slot and seats",
      });
  } else {
    let newDocument = new connection({
      movie: movie,
      slot: slot,
      seats: seats,
    });

    try {
      newDocument.save((error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Document inserted successfully!");
          res.status(200).json({ message: "Booking Successfully" });
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  }
});

// Start server
app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
