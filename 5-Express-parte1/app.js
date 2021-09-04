const express = require("express");
const Joi = require("joi");
const app = express();

/* Metodos de express */
//app.get();
//app.post();
//app.put();
//app.delete();

app.use(express.json());

const usuarios = [
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

  /* if (!req.body.nombre || req.body.nombre.length <= 2) {
    //400 bad Request
    res.status(400).send("Debe ingresar un nombre que tenga minimo 3 letras");
    return;
  }
  const usuario = {
    id: usuarios.length + 1,
    nombre: req.body.nombre,
  };
  usuarios.push(usuario);
  res.send(usuario); */
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
  usuarios.splice(index, 1)

  res.send(usuarios)
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
