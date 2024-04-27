import { ConfigProvider } from "antd";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 2,
        },
      }}
    >
      <Outlet />
    </ConfigProvider>
  );
}
