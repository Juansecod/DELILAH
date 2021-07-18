const express = require("express");
const app = express();
const port = 3000;
const sequalize = require('./config/conexion.js');
const cors = require('cors');
const path = `/api/v1`;

// Routes
const usersRoutes = require('./routers/users.routes.js');
const productsRoutes = require('./routers/products.routes.js');

// Middleware Globales
app.use(express.json());
app.use(cors());

// Routes use
app.use(`${path}/users`, usersRoutes);
app.use(`${path}/products`, productsRoutes);

// Server
app.listen(port, () => {
    console.log(`Server montado en la direccion: http://localhost:${port}`);
});