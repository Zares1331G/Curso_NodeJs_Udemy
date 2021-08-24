//Variables Globales

/* require("./datos");

console.log(global.test);

global.test = "Aquí se cambia la variable";
console.log(global.test);

console.log(module); */

/* const datos = require('./datos');

datos('Hola Mundo') */

/* console.log(__filename)
console.log(__dirname) */

/* Modulo path */
/* const path = require("path");

const objPath = path.parse(__filename);
console.log(objPath); */

/* Modulo OS */
/* const os = require("os");
const { clearScreenDown } = require("readline");

var memoriaLibre = os.freemem();
var memoriaTotal = os.totalmem();

console.log(`Memoria libre: ${memoriaLibre}`);
console.log(`Memoria total: ${memoriaTotal}`); */

/* Modulo File System */
/* const fs = require("fs");

const archivos = fs.readdirSync("./");
console.log(archivos);

fs.readdir('./', function(err, files){
    if(err) console.log('Error', err)
    else console.log('Resultado', files)
}) */

/* Modulo Events */
/* const EventEmitter = require("events");
const emitter = new EventEmitter();

//Refistrar el Listener
emitter.on("mensajeLoger", (arg) => {
  console.log("Listener llamado", arg);
});

//Registrar el evento
emitter.emit("mensajeLoger", { id: 1, url: "http://prueba.com" }); */

/* Modulo HTTP */
const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hola Mundo");
    res.end();
  }

  if (req.url === "api/productos") {
    res.write(JSON.stringify(["mouse", "teclado", "parlante"]));
    res.end();
  }
});

/* server.on("connection", (puerto) => {
  console.log("Nueva conexión...");
});
 */
server.listen(3000);

console.log("Escuchando en el puerto 3000...");
