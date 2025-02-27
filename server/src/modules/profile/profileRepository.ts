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
      [profile.user_id, profile.username, profile.url_avatar],
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

    return rows;
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

    return rows[0];
  }

  // U of CRUD
  async update(profile: Profile) {
    const [result] = await databaseClient.execute<Result>(
      `
      UPDATE profile
      SET username = ?, url_avatar = ?
      WHERE user_id = ? AND id = ?
      `,
      [profile.username, profile.url_avatar, profile.user_id, profile.id],
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
