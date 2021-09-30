import React from "react";
import { colors, fontFamily, fontSize } from "../../assets/css/Style";

const LabelComponent = ({ titulo, linha }) => {
  const { yellow, red } = colors;
  const { insani } = fontFamily;
  const { big } = fontSize;

  const linhaStyle = {
    width: "99.2vw",
    marginLeft: "calc(-50vw + 50%)",

    height: "2px",
    backgroundColor: red.color,
  };

  if (titulo === undefined || titulo === "") titulo = "teste";

  const gerarLinha = () => {
    if (linha) {
      return <div style={linhaStyle}></div>;
    }
  };

  return (
    <div style={{ paddingTop: "40px" }} className="d-flex flex-column">
      <div style={{ maxWidth: "1232px" }} className="justify-content-start">
        <span
          style={{
            ...insani,
            ...big,
            ...yellow,
            paddingLeft: "8px",
            lineHeight: "48px",
          }}
        >
          {titulo}
        </span>
      </div>
      {gerarLinha()}
    </div>
  );
};

export default LabelComponent;
