import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContextProvider.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import Home from "./pages/Home.jsx";
// import Login from "./pages/Login.jsx";
// import Register from './pages/Register.jsx'
// import VideoPlay from "./pages/VideoPlay.jsx";
// import UserProfile from "./pages/UserProfile.jsx";
// import History from "./pages/History.jsx";
// import MyVideos from "./pages/MyVideos.jsx";
// import PublishVideo from "./pages/PublishVideo.jsx";
// import Playlist from "./pages/Playlists.jsx";
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/:username",
//         element: <UserProfile />,
//       },
//       {
//         path: "/videos/:id",
//         element: <VideoPlay />,
//       },
//       {
//         path: "/:id/history",
//         element: <History />,
//       },
//       {
//         path: "/:id/my-videos",
//         element: <MyVideos />,
//       },
//       {
//         path: "/:id/publish-video",
//         element: <PublishVideo />,
//       },
//       {
//         path: "/:id/my-playlists",
//         element: <Playlist />,
//       },
//     ],
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
// ]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENTID} >
    <AuthContextProvider>
      <BrowserRouter >
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </GoogleOAuthProvider>
  // </StrictMode>
);
