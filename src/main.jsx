import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContextProvider.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from './pages/Register.jsx'
import VideoPlay from "./pages/VideoPlay.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import History from "./pages/History.jsx";
import MyVideos from "./pages/MyVideos.jsx";
import PublishVideo from "./pages/PublishVideo.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:username",
        element: <UserProfile />,
      },
      {
        path: "/videos/:id",
        element: <VideoPlay />,
      },
      {
        path: "/:id/history",
        element: <History />,
      },
      {
        path: "/:id/my-videos",
        element: <MyVideos />,
      },
      {
        path: "/:id/publish-video",
        element: <PublishVideo />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>
);
