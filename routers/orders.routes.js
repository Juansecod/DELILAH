const express = require('express');
const router = express.Router();
const ordersControllers = require('../controllers/orders.controllers');
const { userMiddleware } = require('../middleware/middleware.js');

// Middleware global que verifica la sesion activa
router.use(userMiddleware.validationSession);
router.put('/:idPedido/cancel', ordersControllers.cancelOrder);
router.post('/newOrder', ordersControllers.createOrder);
router.get('/:idPedido', ordersControllers.getOrdersByIdClient)
router.get('/', ordersControllers.getOrders);

// Middleware global que valida si es administrador
router.use(userMiddleware.validationAdmin);
router.get('/admin/:idPedido', ordersControllers.getOrdersById);
router.put('/admin/:idPedido/updateState', ordersControllers.updateOrder);


module.exports = router;