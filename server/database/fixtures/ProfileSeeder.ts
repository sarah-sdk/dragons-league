import database, { type Rows } from "../client";
import AbstractSeeder from "./AbstractSeeder";
import UserSeeder from "./UserSeeder";

class ProfileSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "profile", truncate: true, dependencies: [UserSeeder] });
  }

  async run() {
    const profiles = [
      {
        username: "saratruche",
        url_avatar: "assets/images/avatars/avatar1.png",
        user_email: "sarah.smandack@outlook.fr",
      },
      {
        username: "demo_user",
        url_avatar: "assets/images/avatars/avatar2.png",
        user_email: "demo@dragonsleague.com",
      },
    ];

    for (const profile of profiles) {
      const [userRows] = await database.query<Rows>(
        `
        SELECT id
        FROM user
        WHERE email = ?
        `,
        [profile.user_email],
      );

      if (userRows.length > 0) {
        const profileData = {
          user_id: userRows[0].id,
          username: profile.username,
          url_avatar: profile.url_avatar,
        };

        this.insert(profileData);
      } else {
        console.error(`email inconnue: ${profile.user_email}`);
      }
    }
  }
}

export default ProfileSeeder;
