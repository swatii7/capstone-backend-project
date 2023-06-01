const mongodb = require('mongodb');
require('dotenv').config();
let mongoose = require('mongoose');
console.log('environment_type', process.env.NODE_ENV)
const mongoURI = process.env.NODE_ENV === 'production' ? process.env.MONGODBURI : process.env.MONGODBLIVE;
const { bookMovieSchema } = require('./schema')


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("connection established with mongodb server online"); })
    .catch(err => {
        console.log("error while connection", err)
    });
let collection_connection = mongoose.model('bookmovietickets', bookMovieSchema)


exports.connection = collection_connection;
