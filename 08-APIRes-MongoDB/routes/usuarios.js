const express = require("express");
const Usuario = require("../models/usuario_model");
const Joi = require("joi");
const ruta = express.Router();

const schema = Joi.object({
  name: Joi.string().min(3).max(100).required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

ruta.get("/", (req, res) => {
  let resultado = listarUsuariosActivos();
  resultado
    .then((usuarios) => {
      res.json(usuarios);
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
});

ruta.post("/", (req, res) => {
  let body = req.body;

  const { error, value } = schema.validate({
    name: body.name,
    email: body.email,
  });

  if (!error) {
    let result = crearUsuario(body);
    result
      .then((user) => {
        res.json({
          valor: user,
        });
      })
      .catch((err) => {
        res.status(400).json({
          error: err,
        });
      });
  } else {
    res.status(400).json({
      error: error,
    });
  }
});

ruta.put("/:email", (req, res) => {
  let resultado = actualizarUsuarios(req.params.email, req.body);

  const { error, value } = schema.validate({ name: req.body.name });

  if (!error) {
    resultado
      .then((valor) => {
        res.json({
          valor: valor,
        });
      })
      .catch((err) => {
        res.status(400).json({
          error: err,
        });
      });
  } else {
    res.status(400).json({
      error,
    });
  }
});

ruta.delete("/:email", (req, res) => {
  let resultado = desactivarUsuario(req.params.email);
  resultado
    .then((valor) => {
      res.json({
        valor: valor,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
});

async function crearUsuario(body) {
  let usuario = new Usuario({
    email: body.email,
    name: body.name,
    password: body.password,
  });
  return await usuario.save();
}

async function listarUsuariosActivos() {
  let usuarios = await Usuario.find({ state: true });
  return usuarios;
}

async function actualizarUsuarios(email, body) {
  let usuario = await Usuario.findOneAndUpdate(
    { email: email },
    {
      $set: {
        name: body.name,
        password: body.password,
      },
    },
    { new: true }
  );
  return usuario;
}

async function desactivarUsuario(email) {
  let usuario = await Usuario.findOneAndUpdate(
    { email: email },
    {
      $set: {
        state: false,
      },
    },
    { new: true }
  );
  return usuario;
}

module.exports = ruta;
