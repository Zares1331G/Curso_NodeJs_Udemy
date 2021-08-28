const fs = require("fs");

let crearSerie = (cantidad) => {
  return new Promise((resolv, reject) => {
    let fibo1 = 1;
    let fibo2 = 2;
    let serie = "";

    serie += `${fibo1} \t`;

    for (let i = 2; i <= cantidad - 1; i++) {
      serie += `${fibo1} \t`;
      fibo2 = fibo1 + fibo2;
      fibo1 = fibo2 - fibo1;
    }

    fs.writeFile("fibonacci.txt", serie, (err) => {
      if (err) reject("Error al crear el archivo");
      else resolv("El archivo fue creado con exito!");
    });
  });
};

module.exports = { crearSerie };
