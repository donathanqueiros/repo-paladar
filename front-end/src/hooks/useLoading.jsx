import { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { css, Global } from "@emotion/react";

export default function useLoading() {
  const [modalShow, setModalShow] = useState(false);

  const mostrarLoading = () => setModalShow(true);
  const esconderLoading = () => setModalShow(false);

  const LoadingModal = () => {
    return (
      <Modal show={modalShow} centered className="some-class">
        <Global
          styles={css`
            .modal-content {
              background-color: rgba(0, 0, 0, 0.0001) !important;
              border: none;
              align-items: center;
            }
          `}
        />
        <Modal.Body>
          <Spinner animation="border" variant="warning" />
        </Modal.Body>
      </Modal>
    );
  };

  return {
    LoadingModal: LoadingModal,
    mostrarLoading: mostrarLoading,
    esconderLoading: esconderLoading,
  };
}
