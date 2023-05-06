var constantes = require("./constantes");
var mysql = require("mysql")
var conexion = mysql.createConnection(
    {
        host:'db4free.net',
        port: 3306,
        user:'daweb2023',
        password:'daweb2023',
        database:'incidenciasdaweb'
    }
);

conexion.connect((err) => {
    if (err) {
      console.error('Error de conexión: ', err);
      return;
    }
    console.log('Conexión exitosa a la base de datos!');
});

///////////////////////////////////////////////////

module.exports = { getIncidencias, postIncidencia };

function getIncidencias(req, res) {
    console.log(req.query);

    let idRestaurante = req.query.idRestaurante
    
    let query = idRestaurante ?
        `SELECT idRestaurante, nombre, comentario, fechaHora FROM incidencias WHERE idRestaurante="${idRestaurante}" ORDER BY fechaHora DESC`
        : `SELECT idRestaurante, nombre, comentario, fechaHora FROM incidencias ORDER BY fechaHora DESC`

    conexion.query(query,
        (err, filas) => {
            if (err) { 
                console.error(err); 
                filas.send(500, err); 
                return;
            }
            let incidencias = []
            for(var i=0; i<filas.length; i++) {
                let incidencia = {
                    idRestaurante: filas[i].idRestaurante,
                    nombre: filas[i].nombre,
                    comentario: filas[i].comentario,
                    fechaHora: filas[i].fechaHora
                }
                incidencias.push(incidencia);
            }
            console.log(incidencias)
            res.send(incidencias)
        }
    );
}

function postIncidencia(req, res) {
    console.log(req.body);
    
    let incidencia = {
        idRestaurante: req.body.idRestaurante,
        nombre: req.body.nombre,
        comentario: req.body.comentario,
        fechaHora: new Date()
    }

    console.log(incidencia)

    conexion.query('INSERT INTO incidencias set ?',
        incidencia,
        (err, res) => {
            if (err) { 
                console.error(err); 
                res.send(500, err); 
                return;
            }
        });
    res.send(204)
}