import { createBrowserRouter } from "react-router-dom";
import Designer from "@/pages/designer";

const router = createBrowserRouter([{
  path: "/",
  Component: Designer
}]);

export default router;
