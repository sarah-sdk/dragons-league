import AbstractSeeder from "./AbstractSeeder";

class UserSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "user", truncate: true });
  }

  run() {
    const users = [
      {
        username: "saratruche",
        email: "sarah@dragonsleague.com",
        password: "password123",
      },
      {
        username: "demo_user",
        email: "demo@dragonsleague.com",
        password: "password123",
      },
    ];

    for (let i = 0; i < users.length; i++) {
      this.insert(users[i]);
    }
  }
}

export default UserSeeder;
