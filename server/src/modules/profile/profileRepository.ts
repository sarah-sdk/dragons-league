import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { Profile } from "../../types/types";

class profileRepository {
  // C of CRUD
  async create(profile: Omit<Profile, "id">) {
    const [result] = await databaseClient.execute<Result>(
      `
      INSERT INTO profile (username, url_avatar)
      VALUES (?, ?)
      `,
      [profile.username, profile.url_avatar],
    );

    const profileId = result.insertId;

    return profileId;
  }

  // R of CRUD
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT id, username, url_avatar, created_at
      FROM profile
      `,
    );

    return rows;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT id, username, url_avatar, created_at
      FROM profile
      WHERE id = ?
      `,
      [id],
    );

    return rows[0];
  }

  // U of CRUD
  async update(profile: Profile) {
    const [result] = await databaseClient.execute<Result>(
      `
      UPDATE profile
      SET username = ?, url_avtar = ?
      WHERE id = ?
      `,
      [profile.username, profile.url_avatar, profile.id],
    );

    return result.affectedRows > 0;
  }

  // D of CRUD
  async destroy(id: number) {
    const [result] = await databaseClient.execute<Result>(
      `
      DELETE FROM profile
      WHERE id = ?
      `,
      [id],
    );

    return result.affectedRows;
  }
}

export default new profileRepository();
