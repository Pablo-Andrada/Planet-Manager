const express = require("express");
const planetsRouter = require("./src/routes/planets.routes");
const starsRouter = require("./src/routes/stars.routes");
const morgan = require("morgan");
const app = express();

//Middleware para poder leer JSON del body

app.use(express.json());
app.use(morgan('dev'));
//Ruta principal
app.use("/planets", planetsRouter);
app.use("/stars",starsRouter)

module.exports = app;

