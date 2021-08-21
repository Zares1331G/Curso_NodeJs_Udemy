//ES5 -Variables
/* var nombre = "Camilo";
console.log(nombre);
nombre = "David"
console.log(nombre) */

//EX6+ - Variables
/* const nombre6 = "Luis"
let edad = 35;
console.log(nombre6 + edad)

let edad = 40;
console.log(nombre6 + edad) */

//Funciones en ES5
/* const years = [2000, 2005, 2008, 2012];

var edad5 = years.map(function (year) {
  return 2021 - year;
});

console.log(edad5) */

//Funciones en ES6 de tipo flecha
/* let edad6 = years.map((year) => 2021 -year)

console.log(edad6) */

//Funciones CallBack
/* function Mensjae(callback) {
  console.log("Mensaje antes de la llamda callback");
  callback();
}

function Saludo() {
  console.log("Saludo después de la llamada al callback.");
}

Mensjae(Saludo);

function Sumar(num1, num2, callback) {
  let resultado = num1 + num2;
  callback(resultado);
}

function Resultado(res) {
  console.log(res);
}

Sumar(5, 8, Resultado);

setTimeout(() => console.log('Esto se va a llamar luego de 3 segundos'), 3000) */

//Promesas

//Estados de las promesas

//fullfilled - La acción relacionada a la promesa se llevó a cabo con éxito.
//rejected - La acción relacionada a la promesa falló.
//pendind - Aún no se a determínado si la promesa fue fullfilled o rejected
//setteld - Ya se ha determinado si la promesa fue fullfilled o rejected

/* const mensaje = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (true) resolve("Como promesa esto se va a llamar luego de 3 segundos");
    else reject("Hubo un error.");
  }, 3000);
});

mensaje
  .then((msj) => {
    console.log(msj);
  })
  .catch((error) => {
    console.log(error);
  }); */

//Async and Await

function mensaje() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (false)
        resolve("Esto se va ejecutar 3 segundos despues en Async Await");
      else reject("Hubo un error");
    }, 3000);
  });
}

async function llamadaAsync() {
  console.log("Llamada...");
  const resultado = await mensaje();
  return resultado;
}

llamadaAsync()
  .then((x) => console.log(x))
  .catch((e) => console.log(e));
