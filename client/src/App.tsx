import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const hideNavBar =
    location.pathname === "/connexion" ||
    location.pathname === "/inscription" ||
    location.pathname === "/profils";

  useEffect(() => {
    if (
      location.pathname !== "/connexion" &&
      location.pathname !== "/inscription" &&
      location.pathname !== "/proA  fils"
    ) {
      const profileId = localStorage.getItem("profileId");

      if (!profileId) navigate("/profils");
    }
  }, [navigate, location.pathname]);

  return (
    <>
      {!hideNavBar && <NavBar />}
      <Outlet />
    </>
  );
}

export default App;
