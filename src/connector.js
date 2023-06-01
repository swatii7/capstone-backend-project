const express = require("express");
const app = express(); //constants
const mongodb = require('mongodb');
require('dotenv').config();
let mongoose = require('mongoose');
// console.log('environment_type', process.env.NODE_ENV)
const mongoURI = "mongodb+srv://swatic946:QeTaVVbBDWdS8BS0@capstoneproject.djxigtu.mongodb.net/bookMovie";


const isLocalhost = () => {
    const hostname = process.env.HOSTNAME || process.env.HOST;
    return hostname === 'localhost';
  };
  
  if (isLocalhost()) {
    console.log('Application is running in localhost environment.');
  } else {
    console.log('Application is running in a remote environment.');
  }

  
const { bookMovieSchema } = require('./schema')


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("connection established with mongodb server online"); })
    .catch(err => {
        console.log("error while connection", err)
    });
let collection_connection = mongoose.model('bookmovietickets', bookMovieSchema)


exports.connection = collection_connection;
