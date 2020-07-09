const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let productSchema = new Schema({
    type: { type: String, required: false, max: 5 },
    prodNo: { type: String, required: true, max: 10 },
    prodName: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 200 },
    price: { type: String, required: true, max: 15 }
});

//export model
module.exports = mongoose.model('product', productSchema, 'product');