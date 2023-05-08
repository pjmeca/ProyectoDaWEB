import { useEffect, useState } from "react";
import ImagenHeader from "../components/Plantilla/ImagenHeader";
import Estrellas from "../components/Estrellas";
import TablaValoraciones from "../components/Tablas/TablaValoraciones";
import Button from "react-bootstrap/esm/Button";
import DialogoOpinar from "../components/Dialogos/DialogoOpinar";
import { GetJWT } from "../utils/JWT";
import Error404 from "../components/Error404";
import { Spinner } from "react-bootstrap";

export default function Opinion({ id }) {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [backendData, setBackendData] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    fetch(`/opiniones/${id}`, {
      headers: {
        Authentication: `Bearer ${GetJWT()}`,
      },
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
        setDataLoaded(true);
      });
  }, []);

  return (
    <div className="App">
      {!dataLoaded ? (
        <div className="screen-centered">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          {typeof backendData === "undefined" || notFound ? (
            <div className="cuerpo">
              <Error404 />
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
                  id={id}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
