import { createBrowserRouter } from "react-router-dom";
import ReportDesigner from "@/pages/report";

const router = createBrowserRouter([{
  path: "/",
  Component: ReportDesigner
}]);

export default router;
