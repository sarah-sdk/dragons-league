import "@picocss/pico/css/pico.min.css";
import "./App.css";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import AllDragons from "./pages/AllDragons/AllDragons";

function App() {
  return (
    <>
      <NavBar />
      {location.pathname === "/" ? <AllDragons /> : <Outlet />}
    </>
  );
}

export default App;
