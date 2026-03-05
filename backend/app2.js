const express = require("express");
const morgan = require("morgan");
const planetsRouter2 = require("./src/routes/planets.routes2");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use("/planets2", planetsRouter2);


module.exports = app;