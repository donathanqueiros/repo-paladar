import React from "react";
import { ProvideAuth } from "../hooks/useAuth";

import { CarrinhoContextProvider } from "./CarrinhoContext";
import { MobileContextProvider } from "./MobileContext";
import { ModalContextProvider } from "./ModalContext";
// import { MobileContextProvider } from "./MobileContext";

export const GlobalContextProvider = ({ children }) => {
  return (
    <ProvideAuth>
      <CarrinhoContextProvider>
        <MobileContextProvider>
          {/* <ModalContextProvider> */}
          {children}
          {/* </ModalContextProvider> */}
        </MobileContextProvider>
      </CarrinhoContextProvider>
    </ProvideAuth>
  );
};
