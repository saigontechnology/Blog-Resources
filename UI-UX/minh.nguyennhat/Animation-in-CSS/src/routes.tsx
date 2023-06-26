import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Keyframes from "./pages/Keyframes";
import ScrollFramerMotion from "./pages/ScrollFramerMotion";
import Transition from "./pages/Transition";
import WebkitMask from "./pages/WebkitMask";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/keyframes",
      element: <Keyframes />,
    },
    {
      path: "/transition",
      element: <Transition />,
    },
    {
      path: "/scroll-framer-motion",
      element: <ScrollFramerMotion />,
    },
    {
      path: "/webkit-mask",
      element: <WebkitMask />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
