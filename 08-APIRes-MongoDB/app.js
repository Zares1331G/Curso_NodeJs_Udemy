const usuarios = require("./routes/usuarios");
const cursos = require('./routes/cursos')
const express = require("express");
const mongoose = require("mongoose");

//Conexeción a la BD
mongoose
  .connect("mongodb://localhost:27017/demo")
  .then(() => console.log("conectado a mongoDB..."))
  .catch((err) => console.log("No se pudo conectar con MongoDb", err));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/usuarios", usuarios);
app.use("/api/cursos", cursos);

//Configuración del puerto y conexión
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Api RESTFul ok, y ejecuantandose...");
});
