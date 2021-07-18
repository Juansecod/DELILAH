const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/users.controllers');
const { userMiddleware } = require('../middleware/middleware.js');

router.post('/signup', usersControllers.signupUser);
router.post('/login', usersControllers.loginUser);

// Middleware global para validar que exista la sesion
router.use(userMiddleware.validationSession);
router.get('/user', usersControllers.getUser);
router.put('/update', usersControllers.updateUser);
router.put('/updatePassword', usersControllers.updatePassword);
router.delete('/delete', usersControllers.deleteUser);

//Middleware global para validar que sea administrador
router.use(userMiddleware.validationAdmin);
router.get('/', usersControllers.getUsers);
router.put('/updateRol/:idUsuario', usersControllers.updateRol);

module.exports = router;