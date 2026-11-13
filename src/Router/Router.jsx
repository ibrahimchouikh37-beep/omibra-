import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Collections from "../pages/Collections/Collections";
import Products from "../pages/Products/Products";
import Services from "../pages/Services/Services";
import Contact from "../pages/Contact/Contact";
import NotFound from "../pages/NotFound/NotFound";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "collections", element: <Collections /> },
        { path: "products", element: <Products /> },
        { path: "services", element: <Services /> },
        { path: "contact", element: <Contact /> },
      ],
    },
  ],
  {
    basename: "/capsule",
  }
);

export default router;