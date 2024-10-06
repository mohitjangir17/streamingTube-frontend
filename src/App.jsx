import "./App.css";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
