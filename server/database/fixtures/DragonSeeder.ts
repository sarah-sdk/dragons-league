import database, { type Rows } from "../client";
import AbstractSeeder from "./AbstractSeeder";
import ProfileSeeder from "./ProfileSeeder";
import SpecieSeeder from "./SpecieSeeder";

class DragonSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "dragon",
      truncate: true,
      dependencies: [ProfileSeeder, SpecieSeeder],
    });
  }

  async run() {
    const dragons = [
      {
        user_email: "sarah.smandack@outlook.fr",
        profile_username: "saratruche",
        specie_specie: "ombrefeu",
        name: "Krokmou",
        strength: 10,
        speed: 10,
        stamina: 10,
      },
    ];

    for (const dragon of dragons) {
      const [userRows] = await database.query<Rows>(
        `
        SELECT id
        FROM user
        WHERE email = ?
        `,
        [dragon.user_email],
      );

      if (!userRows) console.error(`email inconnue: ${dragon.user_email}`);

      const [profileRows] = await database.query<Rows>(
        `
        SELECT id
        FROM profile
        WHERE username = ? AND user_id = ?
        `,
        [dragon.profile_username, userRows[0].id],
      );

      if (!profileRows)
        console.error(`username inconnu: ${dragon.profile_username}`);

      const [specieRows] = await database.query<Rows>(
        `
        SELECT id
        FROM specie
        WHERE specie = ?
        `,
        [dragon.specie_specie],
      );

      if (!specieRows)
        console.error(`espèce inconnue: ${dragon.specie_specie}`);

      const dragonData = {
        profile_id: profileRows[0].id,
        specie_id: specieRows[0].id,
        name: dragon.name,
        strength: dragon.strength,
        speed: dragon.speed,
        stamina: dragon.stamina,
      };

      this.insert(dragonData);
    }
  }
}

export default DragonSeeder;
