import { Alert, message } from "antd";
import { css, Global } from "@emotion/react";

export default function useMessage() {
  const types = {
    INFO: "info",
    SUCESS: "success",
    WARNING: "warning",
    ERROR: "error",
  };

  function messageGeneric(mensagem, type) {
    message.open({
      content: (
        <>
          <Global
            styles={css`
              .ant-message-notice-content {
                padding: 0 0;
              }
            `}
          />
          <Alert message={mensagem} type={type} showIcon />
        </>
      ),
      icon: "",
      duration: 4,
    });
  }

  const sucess = (mensagem) => {
    messageGeneric(mensagem, types.SUCESS);
  };

  const warning = (mensagem) => {
    messageGeneric(mensagem, types.WARNING);
  };

  const error = (mensagem) => {
    messageGeneric(mensagem, types.ERROR);
  };

  const info = (mensagem) => {
    messageGeneric(mensagem, types.INFO);
  };
  // rgba(0, 0, 0, 0.0001) !important;
  return {
    sucess: sucess,
    warning: warning,
    error: error,
    info: info,
  };
}
