import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { Profile } from "../../types/types";

class profileRepository {
  // C of CRUD
  async create(profile: Omit<Profile, "id">) {
    const [result] = await databaseClient.execute<Result>(
      `
      INSERT INTO profile (user_id, username, url_avatar)
      VALUES (?, ?, ?)
      `,
      [profile.userId, profile.username, profile.urlAvatar],
    );

    const profileId = result.insertId;

    return profileId;
  }

  // R of CRUD
  async readAll(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT user_id, id, username, url_avatar, created_at
      FROM profile
      WHERE user_id = ?
      `,
      [userId],
    );

    return rows.map((profile) => ({
      userId: profile.user_id,
      id: profile.id,
      username: profile.username,
      urlAvatar: profile.url_avatar,
      createdAt: profile.created_at,
    }));
  }

  async read({ userId, profileId }: { userId: number; profileId: number }) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT user_id, id, username, url_avatar, created_at
      FROM profile
      WHERE user_id = ? AND id = ?
      `,
      [userId, profileId],
    );

    const profile = rows[0];

    return {
      userId: profile.user_id,
      id: profile.id,
      username: profile.username,
      urlAvatar: profile.url_avatar,
      createdAt: profile.created_at,
    };
  }

  // U of CRUD
  async update(profile: Profile) {
    const [result] = await databaseClient.execute<Result>(
      `
      UPDATE profile
      SET username = ?, url_avatar = ?
      WHERE user_id = ? AND id = ?
      `,
      [profile.username, profile.urlAvatar, profile.userId, profile.id],
    );

    return result.affectedRows > 0;
  }

  // D of CRUD
  async destroy({ userId, profileId }: { userId: number; profileId: number }) {
    const [result] = await databaseClient.execute<Result>(
      `
      DELETE FROM profile
      WHERE user_id = ? AND id = ?
      `,
      [userId, profileId],
    );

    return result.affectedRows;
  }
}

export default new profileRepository();
