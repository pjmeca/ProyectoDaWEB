const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3030;

// middleware para analizar los datos del formulario en formato JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// Restaurantes
const { getRestaurantes,postRestaurantes , getRestaurante, putRestaurante, deleteRestaurante, getSitiosProximos, postPlato, putPlato, deletePlato } = require('./restaurantes');
app.get("/restaurantes", getRestaurantes);
app.post('/restaurantes', postRestaurantes);
app.get("/restaurantes/:id", getRestaurante);
app.put("/restaurantes/:id", putRestaurante);
app.delete("/restaurantes/:id", deleteRestaurante);
app.get("/restaurantes/:id/sitiosProximos", getSitiosProximos);
app.post("/restaurantes/:id/plato", postPlato);
app.put("/restaurantes/:id/plato", putPlato);
app.delete("/restaurantes/:id/plato", deletePlato);

// Opiniones
const { getOpinion, putOpinion } = require('./opiniones')
app.get("/opiniones/:id", getOpinion);
app.put("/opiniones/:id", putOpinion);

// Incidencias
const { getIncidencias, postIncidencia, deleteIncidencia } = require('./incidencias')
app.get("/incidencias", getIncidencias)
app.post("/incidencias", postIncidencia)
app.delete("/incidencias", deleteIncidencia)