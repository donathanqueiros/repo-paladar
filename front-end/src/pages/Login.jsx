import React, { useEffect } from "react";

import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "../hooks/useAuth";
import { useHistory, useLocation } from "react-router-dom";
import { useState } from "react";

export default () => {
  const [error, setError] = useState(false);
  const auth = useAuth();

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/adm" } };

  const onFinish = (values) => {
    console.log(values);

    const { username, password } = values;

    const incorrectValues = () => {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    };

    auth.signin(username, password).catch(incorrectValues);
  };

  useEffect(() => {
    if (auth.user) {
      history.replace(from);
    }
  }, [auth.user]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        background: "#CCE2FF",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 500,
          background: "#fff",
          margin: "auto",
          padding: "20px",
          borderRadius: "16px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1>Seja bem vindo!</h1>

          <p>demonstração (admin/1234)</p>

          {error && (
            <p
              style={{
                textAlign: "center",
                color: "red",
              }}
            >
              usuario/senha está incorreto
            </p>
          )}
        </div>

        <Form
          size="large"
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: false,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Por favor, informe o usuário!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Usuário"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Por favor, informe a senha!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Senha"
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 18,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Logar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
