import { useEffect, useState } from "react";
import { ConfigProvider, theme } from "antd";
import { useInterpret } from "@xstate/react";
import { Outlet, useNavigate } from "react-router-dom";
import LockModal from "@/components/LockModal";
import machine from "./config";

export default function Layout() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const service = useInterpret(machine, {
    actions: {
      exit() {
        sessionStorage.setItem("LOCKED", "false");
        sessionStorage.setItem("LOGGEDIN", "false");
        navigate("/login");
      },
      lock() {
        sessionStorage.setItem("LOCKED", "true");
        setVisible(true);
      },
      free() {
        sessionStorage.setItem("LOCKED", "false");
        setVisible(false);
      }
    }
  }).onTransition((state) => {
    console.log(state.value);
  });

  const onLogout = () => {
    service.send({ type: "LOGOUT" });
  }

  const onUnlock = () => {
    service.send({ type: "UNLOCK" });
  }

  useEffect(() => {
    if (sessionStorage.getItem("LOCKED") === "true") {
      setVisible(true);
    }
    if (sessionStorage.getItem("LOGGEDIN") === "true") {
      service.send({ type: "LOGIN" });
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <ConfigProvider
      componentSize="large"
      theme={{
        algorithm: theme.compactAlgorithm,
        token: {
          borderRadius: 2,
        },
      }}
    >
      <Outlet />
      <LockModal visible={visible} onClose={onLogout} onUnlock={onUnlock} />
    </ConfigProvider>
  );
}
