
require("dotenv").config();
require("./db");

const express = require("express");
const app = express();

require("./config")(app);


const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const recipeRoutes = require("./routes/recipe.routes");
app.use("/", recipeRoutes);
require("./error-handling")(app);

module.exports = app;
