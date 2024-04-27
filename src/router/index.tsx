import { createBrowserRouter } from "react-router-dom";
import Layout from "@/layouts";
import ReportDesigner from "@/pages/report";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/report-deginer",
        element: <ReportDesigner />,
      },
    ],
  },
]);

export default router;
