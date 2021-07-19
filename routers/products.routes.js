const express = require('express');
const router = express.Router();
const productsControllers = require('../controllers/products.controllers');
const { userMiddleware } = require('../middleware/middleware.js');

router.get('/', productsControllers.getProducts);
router.get('/:idProducto', productsControllers.getProduct);

router.use(userMiddleware.validationSession, userMiddleware.validationAdmin);
router.post('/register', productsControllers.registerProduct);
router.put('/:idProducto/update', productsControllers.updateProduct);
router.delete('/:idProducto/delete', productsControllers.deleteProduct);

module.exports = router;