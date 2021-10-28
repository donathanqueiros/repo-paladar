import React, { createContext, useEffect, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";

export const MobileContext = createContext();

const { Provider } = MobileContext;

export const MobileContextProvider = (props) => {
  const { width } = useWindowDimensions();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (width < 768 && !isMobile) {
      setIsMobile(true);
    } else if (width >= 768 && isMobile) {
      setIsMobile(false);
    }
  }, [width]);

  return <Provider value={[isMobile]}>{props.children}</Provider>;
};
