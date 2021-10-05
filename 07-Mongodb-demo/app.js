const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/demo")
  .then(() => console.log("conectado a mongoDB..."))
  .catch((err) => console.log("No se pudo conectar con MongoDb", err));

const cursoSchema = new mongoose.Schema({
  nombre: String,
  autor: String,
  etiquetas: [String],
  fecha: { type: Date, default: Date.now },
  publicado: Boolean,
});

const Curso = mongoose.model("Curso", cursoSchema);

async function crearCurso() {
  const curso = new Curso({
    nombre: "Inlges",
    autor: "Tatiana",
    etiquetas: ["desarrollo web", "front end"],
    publicado: true,
  });

  const resultado = await curso.save();
  console.log(resultado);
}

//crearCurso();

async function listarCursos() {
  /*  OPERADORES DE COMPARACIÓN  */
  // eq  (equal , igual)
  // ne  (no equal, no igual)
  // gt  (greater than, mayor que)
  // gte (greater than or equal to, mayor o igual que)
  // lt  (less than or equal to, menor que)
  // lte (less than or equal to, menor o igual que)
  // in
  // nin  (not in)

  /*  OPERADORES LOGICOS */
  // or
  // and

  const numberPage = 2;
  const sizePage = 10;
  //api/cursos?numeroPage=4&sizePage=10
  const cursos = await Curso
    //.find({ publicado: true })
    //.find({precio: {$gte:10, $lte: 30}})
    //.find({precio: {$in: [10, 15, 25]}})
    //.find()
    //.or([{autor: 'Cintya'}, {publicado: false}])
    //Empiece con la palabra Cintya
    //.find({ autor: /^Edi/ })
    // Cuando termina en una palabra o una expresion
    //.find({ autor: /tya$/})
    // Cuando un campo tiene un contenido especifico

    .find({ autor: /.*di.*/ })
    .skip((numberPage -1) * sizePage)
    .limit(sizePage)
    .sort({ autor: -1 })
    .select({ autor: 1, nombre: 1, etiquetas: 1 });
  console.log(cursos);
}

//listarCursos();

async function actualizarCurso(id){
  /* const curso = await Curso.findById(id);
  if(!curso) {
    console.log('El curso no existe');
    return;
  }
  curso.publicado= false;
  curso.autor = 'David Leal' */

  /* curso.set({
    publicado: false,
    autor: 'Juan Pablo Vasquez'
  }) */

  /* const resultado = await curso.save();
  console.log(resultado); */

  /* const resultado = await Curso.updateOne({ _id: id}, {
    $set: {
      autor: 'Jhon',
      publicado: true
    }
  });

  console.log(resultado); */

  /* buscar y auctualizar por ID */
  const resultado = await Curso.findByIdAndUpdate(id, {
    $set: {
      autor: 'Tatiana Mejia',
      publicado: true
    }
  }, {new: true});

  console.log(resultado)
}

//actualizarCurso('615c4a3f552980299a5a979f');

async function eliminarDocumento(id){
  const result = await Curso.deleteOne({_id:id});
  //const resultado = await Curso.findByIdAndDelete(id);
  console.log(result);
}

eliminarDocumento('615c4a3f552980299a5a979f')