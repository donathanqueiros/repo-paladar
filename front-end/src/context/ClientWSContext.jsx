import React, { createContext, useState } from "react";

export const ClientWSContext = createContext();

const { Provider } = ClientWSContext;

export const ClientWSContextProvider = (props) => {
  const [client, setClient] = useState(null);
  const [connected, setConnected] = useState(false);

  return (
    <Provider value={{ client, setClient, setConnected, connected }}>
      {props.children}
    </Provider>
  );
};
