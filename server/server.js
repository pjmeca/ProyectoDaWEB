const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3030;

// middleware para analizar los datos del formulario en formato JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const API_ARSO = "http://localhost:8090";

let token =
  "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwNTBkZWUyOS02YmQ4LTQwNmYtODEzOS01Zjc1OTM1ZTY4ODgiLCJpc3MiOiJQYXNhcmVsYSBadXVsIiwiZXhwIjoxNjgyOTMwMTI3LCJzdWIiOiJwam1lY2EiLCJ1c3VhcmlvIjoicGJsbWVjYUBnbWFpbC5jb20iLCJyb2wiOiJHRVNUT1IifQ.XOsVcy_twuJSSj8YdFh7O7Z2JVxnVZGrcx2pGcllSTk";

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

  console.log('Nombre:', nombre);
  console.log('Latitud:', latitud);
  console.log('Longitud:', longitud);

  (async () => {
    const rawResponse = await fetch(API_ARSO+"/restaurantes", {
      method: 'POST',
      headers: {
        Authorization : `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });
    const response = await rawResponse;

    if (response.status === 201) {
      const location = response.headers.get('location');
      const id = location.split('/').pop();
      console.log(id);

      // responder con una respuesta de éxito
      const jsonResponse = { id: id };
      res.status(200).json(jsonResponse); // envía el id del restaurante como JSON
    } else {
      // responder con un error
      res.status(500).send('Error al crear el restaurante');
    }
  })();
});

app.get("/restaurantes/:id", (req, res) => {
  const id = req.params.id;
  fetch(API_ARSO + `/restaurantes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {

      if(response.status != 200) {
        res.status(500)
        return "Error al obtener los datos de la API";
      }

      return response.text()
    })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send("Error al obtener los datos de la API");
    });
});