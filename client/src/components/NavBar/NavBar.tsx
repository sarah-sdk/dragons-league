import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <header>
      <button type="button" onClick={() => navigate(-1)}>
        ←
      </button>
    </header>
  );
}
