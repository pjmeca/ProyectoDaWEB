const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3030;

// middleware para analizar los datos del formulario en formato JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const API_ARSO = "http://localhost:8090";

let token =
  "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI0NmU1YTUzMy1iNjY5LTQ4NWUtODJiMy04MjA2Njg3MGYzZTIiLCJpc3MiOiJQYXNhcmVsYSBadXVsIiwiZXhwIjoxNjgyNjk3MTY5LCJzdWIiOiJwam1lY2EiLCJ1c3VhcmlvIjoicGJsbWVjYUBnbWFpbC5jb20iLCJyb2wiOiJHRVNUT1IifQ.dME8Tcb80D3UTyvPo4uaTW_wbYdnfuNJ7qUIumurpPk";

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get("/prueba", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

app.get("/restaurantes", (req, res) => {
  fetch(API_ARSO + "/restaurantes", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.text())
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send("Error al obtener los datos de la API");
    });
});

app.post('/restaurantes', (req, res) => {
  console.log(req.body)
  const nombre = req.body.nombre;
  const latitud = req.body.latitud;
  const longitud = req.body.longitud;

  // aquí puedes hacer lo que necesites con los datos del formulario
  console.log('Nombre:', nombre);
  console.log('Latitud:', latitud);
  console.log('Longitud:', longitud);

  // responder con una respuesta de éxito
  res.status(200).send('{"id":"644a9a607121f5296a89380a"}'); // envía el id del restaurante
});