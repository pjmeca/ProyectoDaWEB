import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Dialogo(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.body}</Modal.Body>
      <Modal.Footer>
        <>
          {props.buttons}
          <Button variant="secondary" onClick={props.onHide}>
            Cerrar
          </Button>
        </>
      </Modal.Footer>
    </Modal>
  );
}
