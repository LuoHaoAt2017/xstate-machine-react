import { createBrowserRouter } from "react-router-dom";
import Layout from "@/layouts";
import Fan from "@/pages/Fan";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Chat from "@/pages/Chat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Fan />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
    ],
  },
]);

export default router;
