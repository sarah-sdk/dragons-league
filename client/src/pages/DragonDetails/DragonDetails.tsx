import { useEffect } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import AdoptedAt from "../../components/DragonDetails/AdoptedAt";
import NameAndPhoto from "../../components/DragonDetails/NameAndPhoto";
import StatDetails from "../../components/DragonDetails/StatDetails";
import type { Dragon } from "../../types/types";
import "./DragonDetails.css";

export default function DragonDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { dragon } = useLoaderData() as { dragon: Dragon };

  useEffect(() => {
    if (location.state?.trainingSuccess) {
      toast.success("Entraînement effectué avec succès !", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        closeButton: false,
      });
    }
  }, [location]);

  const handleGoTraining = (dragonId: number) => {
    localStorage.setItem("dragonId", dragon.dragon_id.toString());

    navigate(`/mes-dragons/${dragonId}/entrainements`);
  };

  return (
    <article className="dragonDetails">
      <NameAndPhoto dragon={dragon} />
      <StatDetails
        strength={dragon.strength}
        speed={dragon.speed}
        stamina={dragon.stamina}
        size="16"
      />
      <AdoptedAt dragon={dragon} />
      <button type="button" onClick={() => handleGoTraining(+dragon.dragon_id)}>
        Entraine-moi !
      </button>
    </article>
  );
}
