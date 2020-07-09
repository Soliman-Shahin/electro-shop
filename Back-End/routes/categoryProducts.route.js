const express = require('express');
const router = express.Router();


const categoryProducts_controller = require('../controllers/categoryProducts.controller');

// category routes
router.post('/categoryCreate', categoryProducts_controller.category_create);
router.get('/getCategories/:criteria', categoryProducts_controller.categories_details);
router.get('/:id', categoryProducts_controller.categoryProducts_details);
router.put('/:id/update', categoryProducts_controller.category_update);
router.delete('/:id/delete', categoryProducts_controller.category_delete);

// product routes
router.put('/addProduct/:id', categoryProducts_controller.product_create);
router.put('/updateProduct/:id/:prodNo/update', categoryProducts_controller.product_update);
router.delete('/deleteProduct/:id/:prodNo/delete', categoryProducts_controller.product_delete);
router.put('/addProductImg/:id/:prodNo', categoryProducts_controller.product_create_img);
router.get('/getProductDetails/:id/:prodNo', categoryProducts_controller.product_details);
router.get('/getAllProducts/:criteria', categoryProducts_controller.categories_products_details);

module.exports = router;