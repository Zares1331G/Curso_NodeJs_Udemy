const express = require("express");
const Joi = require("joi");

const ruta = express.Router();

const usuarios = [
  { id: 1, nombre: "David" },
  { id: 2, nombre: "Andres" },
  { id: 3, nombre: "Camilo" },
];

ruta.get("/", (req, res) => {
  res.send(usuarios);
});

/* Enviar parametros con Query y Params */
ruta.get("/:id", (req, res) => {
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

ruta.post("/", (req, res) => {
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

ruta.put("/:id", (req, res) => {
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

ruta.delete("/:id", (req, res) => {
  let usuario = existeUsurario(req.params.id);
  if (!usuario) {
    res.status(404).send("El usuario no fue encontrado");
    return;
  }

  const index = usuarios.indexOf(usuario);
  usuarios.splice(index, 1);

  res.send(usuarios);
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

module.exports = ruta