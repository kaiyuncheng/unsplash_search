import { Modal } from "react-bootstrap";

export default function ModalImage({ modalShow, setModalShow, photoUrl }) {
    return (
        <Modal size="lg"
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="modal image"
      ><Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <img src={photoUrl} alt="" width="100%" />
        </Modal.Body>
      </Modal>
    );
}
