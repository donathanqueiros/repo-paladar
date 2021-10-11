import React from "react";

import { CarrinhoContextProvider } from "./CarrinhoContext";
import { MobileContextProvider } from "./MobileContext";
import { ModalContextProvider } from "./ModalContext";
// import { MobileContextProvider } from "./MobileContext";

export const GlobalContextProvider = ({ children }) => {
  return (
    <CarrinhoContextProvider>
      <MobileContextProvider>
        {/* <ModalContextProvider> */}
        {children}
        {/* </ModalContextProvider> */}
      </MobileContextProvider>
    </CarrinhoContextProvider>
  );
};
