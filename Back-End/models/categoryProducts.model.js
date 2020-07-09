const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// category Products schema
let categoryProductsSchema = new Schema({
    category: { type: String, required: true, max: 50 },
    products: [{
        type: { type: String, required: false, max: 5 },
        prodNo: { type: String, required: true, max: 10 },
        prodName: { type: String, required: true, max: 100 },
        description: { type: String, required: true, max: 200 },
        price: { type: String, required: true, max: 15 },
        prodImg: { type: Buffer },
        blocked: { type: Boolean }
    }]
}); // end of Schema


// export model
module.exports = mongoose.model('categoryProducts', categoryProductsSchema, 'categoryProducts');