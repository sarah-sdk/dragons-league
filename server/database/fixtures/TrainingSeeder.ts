import AbstractSeeder from "./AbstractSeeder";

class TrainingSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "training", truncate: true });
  }

  run() {
    const trainings = [
      { type: "speed" },
      { type: "strength" },
      { type: "stamina" },
    ];

    for (let i = 0; i < trainings.length; i++) {
      this.insert(trainings[i]);
    }
  }
}

export default TrainingSeeder;
