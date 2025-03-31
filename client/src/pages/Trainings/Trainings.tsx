import { type FormEvent, useState } from "react";
import { useLoaderData } from "react-router-dom";
import TrainingDisplay from "../../services/trainingDisplay";
import type { Dragon } from "../../types/types";

type TrainingsType = {
  training_type: "strength" | "speed" | "stamina";
  id: number;
};

export default function Trainings() {
  const [statsEarned, setStatsEarned] = useState({
    strengthEarned: 0,
    speedEarned: 0,
    staminaEarned: 0,
  });

  const [trainingId, setTrainingId] = useState(0);

  const { dragon, userId, profileId, trainings } = useLoaderData() as {
    dragon: Dragon;
    userId: number;
    profileId: number;
    trainings: TrainingsType[];
  };

  const handleTrain = (training: TrainingsType) => {
    setTrainingId(training.id);

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
      training_id: trainingId,
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
      // TODO : rediriger vers la page du dragon
      if (data) console.info("Entrainement posté !");
    } catch (error) {
      console.error("Echec lors de l'envoi de l'entrainement");
    }
  };

  return (
    <main>
      <h1>Entrainement de {dragon.name}</h1>

      <form onSubmit={handlePostTraining}>
        {trainings.map((training) => (
          <div key={training.id}>
            <input
              type="checkbox"
              name={training.training_type}
              id={training.training_type}
              onClick={() => handleTrain(training)}
            />
            <label htmlFor={training.training_type}>
              <TrainingDisplay training={training.training_type} />
            </label>
          </div>
        ))}
        <button type="submit">Confirmer l'entraînement</button>
      </form>
    </main>
  );
}
