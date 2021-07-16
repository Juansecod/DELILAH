const express = require("express");
const app = express();
const port = 3000;
// const sequalize = require(./config/conexion.js);
//const cors = require('cors');




// Server
app.listen(port, () => {
    console.log(`Server montado en la direccion: http://localhost:${port}`);
});