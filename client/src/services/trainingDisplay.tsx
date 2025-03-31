import { capitalizeFirstLetter } from "./SpecieDisplay";

function translateTrainings(training: string) {
  if (training === "speed") return "vitesse";
  if (training === "stamina") return "endurance";
  if (training === "strength") return "force";
  return "";
}

export default function TrainingDisplay({ training }: { training: string }) {
  const formatedTraining = translateTrainings(training);
  return capitalizeFirstLetter(formatedTraining);
}
