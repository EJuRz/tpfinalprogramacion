const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

const loginRoutes = require("./routes/login");
const deportesRoutes = require("./routes/deportes");

app.use("/login", loginRoutes);
app.use("/deportes", deportesRoutes);

sequelize
  .sync()
  .then(() => app.listen(3000, () => console.log("Backend en puerto 3000")))
  .catch((err) => console.error("Error al conectar con la base de datos:", err));