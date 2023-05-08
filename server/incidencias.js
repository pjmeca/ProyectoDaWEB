var constantes = require("./constantes");
const moment = require("moment");

var mysql = require("mysql");
var conexion = mysql.createConnection({
  host: "db4free.net",
  port: 3306,
  user: "daweb2023",
  password: "daweb2023",
  database: "incidenciasdaweb",
});

conexion.connect((err) => {
  if (err) {
    console.error("Error de conexión: ", err);
    return;
  }
  console.log("Conexión exitosa a la base de datos!");
});

///////////////////////////////////////////////////

module.exports = { getIncidencias, postIncidencia, deleteIncidencia };

function getIncidencias(req, res) {
  console.log(req.query);

  let idRestaurante = req.query.idRestaurante;

  let query = idRestaurante
    ? `SELECT idRestaurante, nombre, comentario, correo, fechaHora FROM incidencias WHERE idRestaurante="${idRestaurante}" ORDER BY fechaHora DESC`
    : `SELECT idRestaurante, nombre, comentario, correo, fechaHora FROM incidencias ORDER BY fechaHora DESC`;

  conexion.query(query, (err, filas) => {
    if (err) {
      console.error(err);
      filas.send(500, err);
      return;
    }
    let incidencias = [];
    for (var i = 0; i < filas.length; i++) {
      let incidencia = {
        idRestaurante: filas[i].idRestaurante,
        nombre: filas[i].nombre,
        comentario: filas[i].comentario,
        correo: filas[i].correo,
        fechaHora: filas[i].fechaHora,
      };
      incidencias.push(incidencia);
    }
    console.log(incidencias);
    res.send(incidencias);
  });
}

function postIncidencia(req, res) {
  console.log(req.body);

  let incidencia = {
    idRestaurante: req.body.idRestaurante,
    nombre: req.body.nombre,
    comentario: req.body.comentario,
    correo: req.body.correo,
    fechaHora: new Date(),
  };

  console.log(incidencia);

  conexion.query("INSERT INTO incidencias set ?", incidencia, (err, res) => {
    if (err) {
      console.error(err);
      res.send(500, err);
      return;
    }
  });
  res.send(204);
}

function deleteIncidencia(req, res) {
  console.log(req.body);

  let incidencia = {
    idRestaurante: req.body.idRestaurante,
    nombre: req.body.nombre,
    comentario: req.body.comentario,
    correo: req.body.correo,
    fechaHora: moment(req.body.fechaHora).format("YYYY-MM-DD HH:mm:ss"),
  };

  if (!incidencia.fechaHora) {
    res.sendStatus(500);
    return;
  }

  // Tres opciones:
  // 1. nombre y comentario -> borrar la incidencia
  // 2. nombre pero no comentario -> borrar todas las incidencias del plato
  // 3. no nombre -> borrar todas las incidencias del restaurante
  let values = [];
  let query = "";
  if (incidencia.nombre) {
    if (incidencia.comentario && incidencia.correo) {
      // Opción 1 Borrar uno de la tabla
      query =
        "DELETE FROM incidencias WHERE idRestaurante = ? AND nombre = ? AND correo = ? AND comentario = ? AND fechaHora = ?";
      values = [
        incidencia.idRestaurante,
        incidencia.nombre,
        incidencia.correo,
        incidencia.comentario,
        incidencia.fechaHora,
      ];
    } else {
      // Opción 2 Borrar al borrar plato
      query = "DELETE FROM incidencias WHERE idRestaurante = ? AND nombre = ?";
      values = [incidencia.idRestaurante, incidencia.nombre];
    }
  } else {
    // Opción 3 Borrar al borrar restaurante
    query = "DELETE FROM incidencias WHERE idRestaurante = ?";
    values = [incidencia.idRestaurante];
  }

  conexion.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }
    res.sendStatus(204);
  });
}
