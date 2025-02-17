import AbstractSeeder from "./AbstractSeeder";

class UserSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "user", truncate: true });
  }

  run() {
    const users = [
      {
        email: "sarah.smandack@outlook.fr",
        password: "hashpasswor123",
        isAdmin: true,
      },
      {
        email: "demo@dragonsleague.com",
        password: "hashpassword123",
        isAdmin: false,
      },
    ];

    for (let i = 0; i < users.length; i++) {
      this.insert(users[i]);
    }
  }
}

export default UserSeeder;
