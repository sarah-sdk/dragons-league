import { hashPassword } from "../../src/services/passwordServices";
import AbstractSeeder from "./AbstractSeeder";

class UserSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "user", truncate: true });
  }

  async run() {
    const users = [
      {
        email: "sarah.smandack@outlook.fr",
        password: "hashPassword123!",
        isAdmin: true,
      },
      {
        email: "demo@dragonsleague.com",
        password: "hashPassword123!",
        isAdmin: false,
      },
    ];

    for (const user of users) {
      try {
        const hashedPassword = await hashPassword(user.password);

        const userData = {
          email: user.email,
          password: hashedPassword,
          isAdmin: user.isAdmin,
        };

        this.insert(userData);
      } catch (error) {
        console.error(
          `Erreur lors de l'insertion de l'utilisateur ${user.email}:`,
          error,
        );
      }
    }
  }
}

export default UserSeeder;
