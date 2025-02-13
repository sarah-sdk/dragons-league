import AbstractSeeder from "./AbstractSeeder";
import SpecieSeeder from "./SpecieSeeder";
import UserSeeder from "./UserSeeder";

class DragonSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "dragon",
      truncate: true,
      dependencies: [UserSeeder, SpecieSeeder],
    });
  }

  async run() {
    const dragons = [
      {
        user_id: 1,
        specie_id: 5,
        name: "Krokmou",
        strength: 10,
        speed: 10,
        stamina: 10,
      },
    ];

    for (const dragon of dragons) {
      await this.insert(dragon);
    }
  }
}

export default DragonSeeder;
