var constantes = require("./constantes");

module.exports = { getOpinion, putOpinion };

function getOpinion(req, res) {
  const id = req.params.id;
  fetch(constantes.API_ARSO + `/opiniones/${id}`, {
    headers: {
      Authorization: `${req.headers["authentication"]}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        res.status(500);
        return "Error al obtener los datos de la API";
      }

      return response.text();
    })
    .then((data) => {
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1
      res.setHeader("Expires", "0"); // HTTP 1.0
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send("Error al obtener los datos de la API");
    });
}

function putOpinion(req, res) {
  
  const id = req.params.id;
  
  console.log(req.body);   
  
  (async () => {
    const rawResponse = await fetch(constantes.API_ARSO + `/opiniones/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `${req.headers["authentication"]}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });
    const response = await rawResponse;

    if (response.ok) {  
      // responder no content
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1
      res.setHeader("Expires", "0");
      res.status(204).send()
    } else {
      // responder con un error
      res.status(500).send("Error al crear el restaurante");
    }
  })();
}
