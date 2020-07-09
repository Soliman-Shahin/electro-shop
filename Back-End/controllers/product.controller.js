const Product = require('../models/product.model');

// product details
exports.product_details = (req, res) => {
    product.findById(req.params.id, (err, product) => {
        if (err) return next(err);
        res.send(product);
    })
};

// create product
exports.product_create = (req, res) => {
    let product = new Product({
        type: req.body.type,
        prodName: req.body.prodName,
        description: req.body.description,
        price: req.body.price,
    });
    product.save((err) => {
        if (err) return next(err);
        res.send('Product created successfully');
    });
}

// create product
exports.product_update = (req, res) => {
    Product.findByIdAndUpdate(req.params.id, { $set: req.body },
        (err, product) => {
            if (err) return next(err);
            res.send('Product Updated');
        });
}

// delete product
exports.product_delete = (req, res) => {
    Product.findByIdAndRemove(req.params.id,
        (err) => {
            if (err) return next(err);
            res.send('Product Deleted');
        });
}