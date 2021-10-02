const debug = require("debug")("app:inicio");
//const dbDebug = require("debug")("app:dataBase");
const express = require("express");
const config = require("config");
//const logger = require("./logger");
const morgan = require("morgan");
const Joi = require("joi");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Middleware para leer formatos de formlurios
app.use(express.static("public")); //Middleware para renderizar en el navegador archivos

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
}) */ const usuarios = [
  { id: 1, nombre: "David" },
  { id: 2, nombre: "Andres" },
  { id: 3, nombre: "Camilo" },
];

app.get("/", (req, res) => {
  res.send("Hola Mundo desde Express.");
});

app.get("/api/usuarios", (req, res) => {
  res.send(usuarios);
});

/* Enviar parametros con Query y Params */
app.get("/api/usuarios/:id", (req, res) => {
  //let usuario = usuarios.find((u) => u.id === parseInt(req.params.id));
  let usuario = existeUsurario(req.params.id);
  if (!usuario) {
    res.status(404).send("El usuario no fue encontrado");
    return;
  }
  res.send(usuario);
  //res.send(req.query)
  //res.send(req.params)
});

app.post("/api/usuarios", (req, res) => {
  //De esta forma se comprueba que el middleware de urlencodde
  /* let body = req.body
  console.log(body.nombre)
  res.json({body}) */
  const schema = Joi.object({
    nombre: Joi.string().min(3).required(),
  });

  const { error, value } = validarUsuario(req.body.nombre);

  if (!error) {
    const usuario = {
      id: usuarios.length + 1,
      nombre: value.nombre,
    };
    usuarios.push(usuario);
    res.send(usuario);
  } else {
    const mensaje = error.details[0].message;
    res.status(400).send(mensaje);
    console.log(mensaje);
  }
});

app.put("/api/usuarios/:id", (req, res) => {
  //Encontrar si existe el objeto a modificicar
  let usuario = existeUsurario(req.params.id);
  if (!usuario) {
    res.status(404).send("El usuario no fue encontrado");
    return;
  }

  //Validar que el dato sea el correcto
  const { error, value } = validarUsuario(req.body.nombre);
  if (error) {
    const mensaje = error.details[0].message;
    res.status(400).send(mensaje);
    return;
  }

  usuario.nombre = value.nombre;
  res.send(usuario);
});

app.delete("/api/usuarios/:id", (req, res) => {
  let usuario = existeUsurario(req.params.id);
  if (!usuario) {
    res.status(404).send("El usuario no fue encontrado");
    return;
  }

  const index = usuarios.indexOf(usuario);
  usuarios.splice(index, 1);

  res.send(usuarios);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}...`);
});

const existeUsurario = (id) => {
  return usuarios.find((u) => u.id === parseInt(id));
};

const validarUsuario = (nom) => {
  const schema = Joi.object({
    nombre: Joi.string().min(3).required(),
  });

  return schema.validate({ nombre: nom });
};
