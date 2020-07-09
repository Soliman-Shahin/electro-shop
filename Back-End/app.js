const express = require('express');
const bodyParser = require("body-parser"); //to parse the incomming bodies as JSON
const fileUpload = require('express-fileupload');
const cors = require('cors');
const product = require('./routes/product.route');
const categoryProducts = require('./routes/categoryProducts.route');
const mongoose = require('mongoose');
let port = 4000;

let db_url = 'mongodb://localhost:27017/ElectroShop';
//mongoose.connect('mongodb://username:password@host:port/database?options...', {useNewUrlParser: true});


// Initialize site backend
const app = express();

// bring cors.js
app.use(cors());

// Setup monogodb connection
mongoose.connect(db_url, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });
const db = mongoose.connection;

mongoose.Promise = global.Promise; // for old versions of mongodb
db.on('error', console.error.bind(console, 'MongoDB Connection Error!!!'));


app.use('/images', express.static(__dirname + '/uploads'));
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/products', product);
app.use('/categoryProducts', categoryProducts);


// listen to port 4000
app.listen(port, () => {
    console.log('Server is running on port : ' + port);
})