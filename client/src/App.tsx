import "./App.css";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      navigate("/profils");
    }
  }, [navigate]);

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default App;
