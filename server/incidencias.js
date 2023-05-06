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

module.exports = { postIncidencia };

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
  }