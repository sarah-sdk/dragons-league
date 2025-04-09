import { type FormEvent, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import StatDetails from "../../components/DragonDetails/StatDetails";
import type { Dragon, TrainingsType } from "../../types/types";
import "./Trainings.css";
import NameAndPhoto from "../../components/DragonDetails/NameAndPhoto";
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
    type: null,
  });

  const { dragon, userId, profileId, trainings } = useLoaderData() as {
    dragon: Dragon;
    userId: number;
    profileId: number;
    trainings: TrainingsType[];
  };

  const trainingEmoji: {
    training: "speed" | "strength" | "stamina";
    emoji: string;
  }[] = [
    { training: "strength", emoji: "💪🏼" },
    { training: "speed", emoji: "🪽" },
    { training: "stamina", emoji: "⚡️" },
  ];

  const getRadioClass = (trainingType: string) => {
    switch (trainingType) {
      case "speed":
        return "bgSpeed";
      case "strength":
        return "bgStrength";
      case "stamina":
        return "bgStamina";
      default:
        return "";
    }
  };

  const handleTrain = (training: TrainingsType) => {
    setSelectedTraining(training);

    setStatsEarned((prev) => ({
      strengthEarned:
        training.type === "strength"
          ? prev.strengthEarned + 1
          : prev.strengthEarned,
      speedEarned:
        training.type === "speed" ? prev.speedEarned + 1 : prev.speedEarned,
      staminaEarned:
        training.type === "stamina"
          ? prev.staminaEarned + 1
          : prev.staminaEarned,
    }));
  };

  const handlePostTraining = async (event: FormEvent) => {
    event.preventDefault();

    const stats = {
      userId: userId,
      profileId: +profileId,
      dragonId: dragon.dragonId,
      trainingId: selectedTraining.id,
      strengthEarned: statsEarned.strengthEarned,
      speedEarned: statsEarned.speedEarned,
      staminaEarned: statsEarned.staminaEarned,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${userId}/profiles/${profileId}/dragons/${dragon.dragonId}/trainings`,
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
        navigate(`/mes-dragons/${dragon.dragonId}`, {
          state: { trainingSuccess: true },
        });
    } catch (error) {
      console.error("Echec lors de l'envoi de l'entrainement");
    }
  };

  return (
    <article className="trainingList">
      <NameAndPhoto dragon={dragon} />
      <StatDetails
        strength={dragon.strength}
        speed={dragon.speed}
        stamina={dragon.stamina}
        size="16"
        highlightedStat={selectedTraining.type}
      />

      <form onSubmit={handlePostTraining}>
        {trainings.map((training) => (
          <InputField
            key={training.type}
            label={
              trainingEmoji.find((t) => t.training === training.type)?.emoji ??
              "❓"
            }
            type="radio"
            name="training"
            id={training.type ?? undefined}
            onChange={() => handleTrain(training)}
            className={`statButton ${getRadioClass(training.type ?? "")}`}
          />
        ))}
        <button type="submit">Confirmer l'entraînement</button>
      </form>
    </article>
  );
}
