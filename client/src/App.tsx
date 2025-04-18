import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import { ToastContainer } from "react-toastify";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const hideNavBar =
    location.pathname === "/bienvenue" ||
    location.pathname === "/connexion" ||
    location.pathname === "/inscription" ||
    location.pathname === "/profils";

  useEffect(() => {
    if (
      location.pathname !== "/bienvenue" &&
      location.pathname !== "/connexion" &&
      location.pathname !== "/inscription" &&
      location.pathname !== "/profils"
    ) {
      const profileId = localStorage.getItem("profileId");

      if (!profileId) navigate("/profils");
    }
  }, [navigate, location.pathname]);

  return (
    <>
      {!hideNavBar && <NavBar />}
      <main>
        <ToastContainer />
        <Outlet />
      </main>
    </>
  );
}

export default App;
