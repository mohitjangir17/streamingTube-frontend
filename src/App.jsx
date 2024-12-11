import "./App.css";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VideoPlay from "./pages/VideoPlay";
import History from "./pages/History";
import MyVideos from "./pages/MyVideos";
import PublishVideo from "./pages/PublishVideo";
import Playlists from "./pages/Playlists";
import Playlist from "./pages/Playlist";
import { PrivateRoutes } from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        {/* public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/videos/:id" element={<VideoPlay />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* *************** */}

        {/* private routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/:username" element={<UserProfile />} />
          <Route path=":id/history" element={<History />} />
          <Route path="/:id/my-videos" element={<MyVideos />} />
          <Route path="/:id/publish-video" element={<PublishVideo />} />
          <Route path="/:id/my-playlists" element={<Playlists />} />
          <Route path="/:id/my-playlists/:playlistId" element={< Playlist />} />
        </Route>
        {/**********/}

      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
