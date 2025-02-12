import AbstractSeeder from "./AbstractSeeder";

class TrainingSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "training", truncate: true });
  }

  run() {
    const trainings = [
      { training_type: "speed" },
      { training_type: "strength" },
      { training_type: "stamina" },
    ];

    for (let i = 0; i < trainings.length; i++) {
      this.insert(trainings[i]);
    }
  }
}

export default TrainingSeeder;
