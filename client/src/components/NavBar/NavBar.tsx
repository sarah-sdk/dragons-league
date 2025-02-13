import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <header>
      <button type="button" onClick={handleGoBack}>
        ←
      </button>
    </header>
  );
}
