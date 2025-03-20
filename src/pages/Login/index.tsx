import { Button, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("LOGGEDIN", "true");
      navigate("/");
    }, 3000);

  }

  useEffect(() => {
    sessionStorage.setItem("LOGGEDIN", "false");
  }, []);

  if (loading) {
    return <Spin>登录认证中......</Spin>
  }
  return <Button onClick={handleLogin}>登录</Button>
}

export default Login;