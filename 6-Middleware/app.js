const debug = require("debug")("app:inicio");
//const dbDebug = require("debug")("app:dataBase");
const express = require("express");
const config = require("config");
//const logger = require("./logger");
const morgan = require("morgan");
const app = express();
const usuarios = require('./routes/usuarios')

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Middleware para leer formatos de formlurios
app.use(express.static("public")); //Middleware para renderizar en el navegador archivos
app.use('/api/usuarios', usuarios)

//Configuración de entornos
console.log("Aplicación: " + config.get("nombre"));
console.log("BD server: " + config.get("configDB.host"));

//Uso de middleware de terceros - morgan
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  //console.log("Morgan habilitado..");
  debug("Morgan esta habilitado");
}

//Trabajos con la base de datos
debug("Conectando con la bd....");

//app.use(logger);
/* app.use((req, res, next) => {
  console.log("Autenticando...");
  next();
}) */ 

app.get("/", (req, res) => {
  res.send("Hola Mundo desde Express.");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}...`);
});

