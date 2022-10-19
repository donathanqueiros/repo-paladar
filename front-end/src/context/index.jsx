import React from "react";
import { ProvideAuth } from "../hooks/useAuth";

import { CarrinhoContextProvider } from "./CarrinhoContext";
import { ClientWSContextProvider } from "./ClientWSContext";
import { MobileContextProvider } from "./MobileContext";
import { ModalContextProvider } from "./ModalContext";
// import { MobileContextProvider } from "./MobileContext";

export const GlobalContextProvider = ({ children }) => {
  return (
    <ProvideAuth>
      <ClientWSContextProvider>
        <CarrinhoContextProvider>
          <MobileContextProvider>
            {/* <ModalContextProvider> */}
            {children}
            {/* </ModalContextProvider> */}
          </MobileContextProvider>
        </CarrinhoContextProvider>
      </ClientWSContextProvider>
    </ProvideAuth>
  );
};
