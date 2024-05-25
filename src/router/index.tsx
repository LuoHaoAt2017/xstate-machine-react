import { createBrowserRouter } from "react-router-dom";
import Layout from "@/layouts";
import ReportDesigner from "@/pages/report";
import AppSearch from "@/pages/AppSearch";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/report-deginer",
        element: <ReportDesigner />,
      },
      {
        path: "/app-search",
        element: <AppSearch />,
      },
    ],
  },
]);

export default router;
