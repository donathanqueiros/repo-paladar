import React, { createContext, useState } from "react";

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

  const ModalComponentt = ({ children }) => {
    return (
      // <ModalComponent key="modal" onHide={closeModal} show={show}>
      <div></div>
      // </ModalComponent>
    );
  };

  return (
    <Provider value={[openModal, closeModal, ModalComponentt]}>
      {props.children}
    </Provider>
  );
};
