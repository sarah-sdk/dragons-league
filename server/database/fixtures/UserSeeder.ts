import AbstractSeeder from "./AbstractSeeder";

class UserSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "user", truncate: true });
  }

  run() {
    const users = [
      {
        username: "saratruche",
        url_avatar: "assets/images/avatars/avatar1.png",
      },
      {
        username: "demo_user",
        url_avatar: "assets/images/avatars/avatar2.png",
      },
    ];

    for (let i = 0; i < users.length; i++) {
      this.insert(users[i]);
    }
  }
}

export default UserSeeder;
