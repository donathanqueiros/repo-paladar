import React, { useEffect } from "react";

import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "../hooks/useAuth";
import { useHistory, useLocation } from "react-router-dom";

export default () => {
  const auth = useAuth();

  let history = useHistory();

  const signout = () => {
    auth.signout();
    history.push("/login");
  };

  useEffect(() => {
    signout();
  }, []);

  return null;
};
