const express = require("express");
const planetsRouter = require("./src/routes/planets.routes");
const app = express();

//Middleware para poder leer JSON del body

app.use(express.json());

//Ruta principal
app.use("/planets", planetsRouter);


module.exports = app;