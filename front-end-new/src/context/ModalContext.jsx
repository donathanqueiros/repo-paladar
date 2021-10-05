import React, { createContext, useState } from "react";
import ModalComponentt from "../Components/Cardapio/ModalComponent";

export const ModalContext = createContext();

const { Provider } = ModalContext;

export const ModalContextProvider = (props) => {
  const [show, setShow] = useState(false);

  const openModal = () => {
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
  };

  const ModalComponent = ({ children }) => {
    return (
      <ModalComponentt key="modal" onHide={closeModal} show={show}>
        {children}
      </ModalComponentt>
    );
  };

  return (
    <Provider value={[openModal, closeModal, ModalComponent]}>
      {props.children}
    </Provider>
  );
};
