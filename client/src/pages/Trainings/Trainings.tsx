import { type FormEvent, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import StatDetails from "../../components/DragonDetails/StatDetails";
import getDragonImage from "../../services/getDragonImage";
import type { Dragon, TrainingsType } from "../../types/types";
import "./Trainings.css";
import InputField from "../../components/Form/InputField";

export default function Trainings() {
  const navigate = useNavigate();

  const [statsEarned, setStatsEarned] = useState({
    strengthEarned: 0,
    speedEarned: 0,
    staminaEarned: 0,
  });

  const [selectedTraining, setSelectedTraining] = useState<TrainingsType>({
    id: 0,
    training_type: null,
  });

  const { dragon, userId, profileId, trainings } = useLoaderData() as {
    dragon: Dragon;
    userId: number;
    profileId: number;
    trainings: TrainingsType[];
  };

  const imageDragon = getDragonImage({ dragon });

  const trainingEmoji: {
    training: "speed" | "strength" | "stamina";
    emoji: string;
  }[] = [
    { training: "strength", emoji: "💪🏼" },
    { training: "speed", emoji: "🪽" },
    { training: "stamina", emoji: "♥️" },
  ];

  const getRadioClass = (trainingType: string) => {
    switch (trainingType) {
      case "speed":
        return "bgBlue";
      case "strength":
        return "bgRed";
      case "stamina":
        return "bgGreen";
      default:
        return "";
    }
  };

  const handleTrain = (training: TrainingsType) => {
    setSelectedTraining(training);

    setStatsEarned((prev) => ({
      strengthEarned:
        training.training_type === "strength"
          ? prev.strengthEarned + 1
          : prev.strengthEarned,
      speedEarned:
        training.training_type === "speed"
          ? prev.speedEarned + 1
          : prev.speedEarned,
      staminaEarned:
        training.training_type === "stamina"
          ? prev.staminaEarned + 1
          : prev.staminaEarned,
    }));
  };

  const handlePostTraining = async (event: FormEvent) => {
    event.preventDefault();

    const stats = {
      user_id: userId,
      profile_id: +profileId,
      dragon_id: dragon.dragon_id,
      training_id: selectedTraining.id,
      strength_earned: statsEarned.strengthEarned,
      speed_earned: statsEarned.speedEarned,
      stamina_earned: statsEarned.staminaEarned,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${userId}/profiles/${profileId}/dragons/${dragon.dragon_id}/trainings`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(stats),
        },
      );

      const data = await response.json();
      if (data)
        navigate(`/mes-dragons/${dragon.dragon_id}`, {
          state: { trainingSuccess: true },
        });
    } catch (error) {
      console.error("Echec lors de l'envoi de l'entrainement");
    }
  };

  return (
    <section className="trainingList">
      <h1>Entrainez {dragon.name}</h1>

      <article>
        <img
          src={`${import.meta.env.VITE_API_URL}/${imageDragon}`}
          alt={dragon.name}
        />
        <StatDetails
          strength={dragon.strength}
          speed={dragon.speed}
          stamina={dragon.stamina}
          size="16"
          highlightedStat={selectedTraining.training_type}
        />

        <form onSubmit={handlePostTraining}>
          {trainings.map((training) => (
            <InputField
              key={training.training_type}
              label={
                trainingEmoji.find((t) => t.training === training.training_type)
                  ?.emoji ?? "❓"
              }
              type="radio"
              name="training"
              id={training.training_type ?? undefined}
              onChange={() => handleTrain(training)}
              className={`statButton ${getRadioClass(training.training_type ?? "")}`}
            />
          ))}
          <button type="submit">Confirmer l'entraînement</button>
        </form>
      </article>
    </section>
  );
}
