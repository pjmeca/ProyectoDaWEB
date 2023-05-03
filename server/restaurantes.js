var constantes = require("./constantes");

module.exports = {
  getRestaurantes,
  postRestaurantes,
  getRestaurante,
  putRestaurante,
  deleteRestaurante,
  getSitiosProximos,
};

function getRestaurantes(req, res) {
  fetch(constantes.API_ARSO + "/restaurantes", {
    headers: {
      Authorization: `${req.headers["authentication"]}`,
    },
  })
    .then((response) => response.text())
    .then((data) => {
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1
      res.setHeader("Expires", "0"); // HTTP 1.0
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send("Error al obtener los datos de la API");
    });
}

function postRestaurantes(req, res) {
  console.log(req.body);
  const nombre = req.body.nombre;
  const latitud = req.body.latitud;
  const longitud = req.body.longitud;

  console.log("Nombre:", nombre);
  console.log("Latitud:", latitud);
  console.log("Longitud:", longitud);

  // Crear el restaurante
  (async () => {
    const rawResponse = await fetch(`${constantes.API_ARSO}/restaurantes/`, {
      method: "POST",
      headers: {
        Authorization: `${req.headers["authentication"]}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });
    const response = await rawResponse;

    if (response.ok) {
      const location = response.headers.get("location");
      const id = location.split("/").pop();
      console.log(id);

      // responder con una respuesta de éxito
      const jsonResponse = { id: id };
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1
      res.setHeader("Expires", "0");
      res.status(200).json(jsonResponse); // envía el id del restaurante como JSON
    } else {
      // responder con un error
      res.status(500).send("Error al crear el restaurante");
    }
  })();
}

function putRestaurante(req, res) {
  console.log(req.body);

  // Crear el restaurante
  (async () => {
    const rawResponse = await fetch(`${constantes.API_ARSO}/restaurantes/${req.params.id}`, {
      method: "PUT",
      headers: {
        Authorization: `${req.headers["authentication"]}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });
    const response = await rawResponse;

    if (response.ok) {
      res.status(204).send(); 
    } else {
      // responder con un error
      res.status(500).send("Error al modificar el restaurante");
    }
  })();
}

function getRestaurante(req, res) {
  const id = req.params.id;
  fetch(constantes.API_ARSO + `/restaurantes/${id}`, {
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

function deleteRestaurante(req, res) {
  const id = req.params.id;
  fetch(constantes.API_ARSO + `/restaurantes/${id}`, {
    headers: {
      Authorization: `${req.headers["authentication"]}`,
    },
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        res.status(500);
        return "Error al obtener los datos de la API";
      }
    })
    .then(res.status(204).send())
    .catch((error) => {
      res.status(500).send("Error al obtener los datos de la API");
    });
}

function getSitiosProximos(req, res) {
  const id = req.params.id;
  fetch(`${constantes.API_ARSO}/restaurantes/${id}/sitiosProximos`, {
    headers: {
      Authorization: `${req.headers["authentication"]}`,
    }
  })
  .then((response) => {
    if (!response.ok) {
      res.status(500);
      return "Error al obtener los datos de la API";
    }
    return response.json()
  })
  .then((data) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1
    res.setHeader("Expires", "0"); // HTTP 1.0
    res.send(data);
  })
  .catch(() => {
    res.status(500).send("Error al obtener los datos de la API");
  });
}