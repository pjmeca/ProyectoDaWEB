import { useEffect, useState } from "react";
import ImagenHeader from "../components/Plantilla/ImagenHeader";
import Estrellas from "../components/Estrellas";
import TablaValoraciones from "../components/Tablas/TablaValoraciones";
import Button from "react-bootstrap/esm/Button";
import DialogoOpinar from "../components/Dialogos/DialogoOpinar";
import { GetJWT } from "../utils/JWT";

export default function Opinion({ id }) {
  const [backendData, setBackendData] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    fetch(`/opiniones/${id}`, {
        headers: {
            "Authentication": `Bearer ${GetJWT()}`,
        }
    })
      .then((response) => {
        if (!response.ok) {
          setNotFound(true);
          return "";
        }

        return response.json();
      })
      .then((data) => {
        console.log(data);
        setBackendData(data);
      });
  }, []);

  return (
    <div className="App">
      {typeof backendData === "undefined" || notFound ? (
        <div className="cuerpo">
          <p>404</p>
        </div>
      ) : (
        <>
          <ImagenHeader titulo={"Opinión de " + backendData.nombre} />

          <div className="cuerpo">
            <Estrellas
              calificacion={backendData.calificacionMedia}
              text={" " + backendData.numValoraciones}
              style={{ fontSize: "2rem" }}
            />

            <div style={{ textAlign: "right" }}>
              <Button variant="primary" onClick={() => setModalShow(true)}>
                Opinar
              </Button>
            </div>

            <TablaValoraciones valoraciones={backendData.valoraciones} />

            <DialogoOpinar 
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
          </div>
        </>
      )}
    </div>
  );
}
