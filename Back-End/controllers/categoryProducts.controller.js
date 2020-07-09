const categoryProducts = require('../models/categoryProducts.model');

// category functions
// create category 
exports.category_create = (req, res) => {
    let category = new categoryProducts({
        category: req.body.category,
        products: []
    });
    category.save((err) => {
        if (err) return err;
        res.status(200).json({ success: true, msg: 'category created successfully' });
    })
}

// categories details
exports.categories_details = (req, res) => {
    let query = categoryProducts.find(null);
    //query.find({field1:value1,general.field2:val2});
    //query.limit(3) //no of returned records
    //query.sort(field1:-1)
    //query.where('name.firstName').equals('value')
    //query.where('age').gt(17).lt(66) from to
    //query.where('favorites').in(['football','basketball'])
    query.select('category');
    query.exec((err, categories) => {
        if (err) return err;
        res.status(200).json({ success: true, data: categories });
    });

}

// category products details
exports.categoryProducts_details = (req, res) => {
    categoryProducts.findById(req.params.id,
        (err, products) => {
            if (err) return err;
            res.status(200).json({ success: true, data: products });
        });
}

// update category
exports.category_update = (req, res) => {
    categoryProducts.findOneAndUpdate({ _id: req.params.id }, { $set: req.body },
        (err, category) => {

            if (err) return err;
            res.status(200).json({ success: true, data: category });

        }
    )
}

// delete category
exports.category_delete = (req, res) => {
    categoryProducts.findOneAndRemove({ _id: req.params.id },
        (err) => {
            if (err) return err;
            res.status(200).json({
                success: true,
                msg: 'category deleted'
            });
        })
}


// product functions
// create product
exports.product_create = (req, res) => {
    categoryProducts.updateOne({ _id: req.params.id }, {
        $push: {
            products: {
                prodNo: req.body.prodNo,
                prodName: req.body.prodName,
                type: req.body.type,
                description: req.body.description,
                price: req.body.price,
                //prodImg:req.body.prodImg,
                blocked: false,
            }
        }
    }, (err) => {
        if (err) return err;
        res.status(200).json({
            success: true,
            msg: 'product created successfully'
        });
    });

}

// update product
exports.product_update = (req, res) => {
    categoryProducts.updateOne({ _id: req.params.id, "products.prodNo": req.params.prodNo }, {
        $set: {
            // "products.$.prodNo":req.body.prodNo,
            "products.$.prodName": req.body.prodName,
            "products.$.type": req.body.type,
            "products.$.description": req.body.description,
            "products.$.price": req.body.price,
            // "products.$.prodImg": req.body.prodImg,
            "products.$.blocked": false,
        }
    }, (err) => {
        if (err) return err;
        res.status(200).json({
            success: true,
            msg: 'product updated successfully'
        });
    })
}

// delete product
exports.product_delete = (req, res) => {
    categoryProducts.updateOne({ _id: req.params.id }, { $pull: { products: { prodNo: req.params.prodNo } } }, { multi: false },
        (err) => {
            if (err) return err;
            res.status(200).json({
                success: true,
                msg: 'product deleted successfully'
            });
        }
    )
}

// upload product img
exports.product_create_img = (req, res) => {
    if (req.files) {
        // file upload : imageFile is name of input
        // uploads folder name
        req.files.imageFile.mv('uploads/' + req.params.prodNo + ".jpg", (err) => {
            if (err)
                return res.status(500).send(err);
        });
        categoryProducts.updateOne({
                _id: req.params.id,
                "products.prodNo": req.params.prodNo
            }, {
                $set: {
                    "products.$.prodImg": req.files.imageFile.data
                }
            },
            (err) => {
                if (err) return err;
                res.status(200).json({
                    success: true,
                    msg: 'product image uploaded successfully'
                });
            });
    } else {
        res.status(500).json({
            success: false,
            msg: 'no image for upload'
        });
    }
}

// product details
exports.product_details = (req, res) => {
    let query = categoryProducts.find({
        _id: req.params.id,
        "products.prodNo": req.params.prodNo
    });
    query.exec((err, product) => {
        if (err) return err;
        res.status(200).json({
            success: true,
            data: product
        });
    })
}

// all products on cuontry
exports.categories_products_details = (req, res) => {
    let query = categoryProducts.find(null);
    query.exec((err, allData) => {
        if (err)
            return res.status(500).send(err);
        return res.status(200).json({ success: true, productsData: allData });
    });
}