const express = require("express");
//-------------------------------------------------------------------
const planetsRouter = require("./src/routes/planets.routes");
const starsRouter = require("./src/routes/stars.routes");
const asteroidsRouter = require("./src/routes/asteroids.routes");
const moonsRouter = require("./src/routes/moons.routes");
//-------------------------------------------------------------------
const morgan = require("morgan");
const app = express();

//Middleware para poder leer JSON del body

app.use(express.json());
app.use(morgan('dev'));
//Ruta principal
app.use("/moons", moonsRouter);
app.use("/planets", planetsRouter);
app.use("/stars", starsRouter);
app.use("/asteroids", asteroidsRouter);

module.exports = app;

