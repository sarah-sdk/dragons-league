import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { Dragon } from "../../types/types";

class dragonRepository {
  // C of CRUD
  async create(dragon: Omit<Dragon, "id" | "strength" | "speed" | "stamina">) {
    const [profileCheck] = await databaseClient.query<Rows>(
      `
      SELECT id
      FROM profile
      WHERE user_id = ? AND id = ?
      `,
      [dragon.user_id, dragon.profile_id],
    );

    if (profileCheck.length === 0)
      throw new Error("Profil non lié à cet utilisateur.");

    const [result] = await databaseClient.execute<Result>(
      `
      INSERT INTO dragon (name, specie_id, profile_id, strength, speed, stamina)
      VALUES (?, ?, ?,
        (SELECT base_strength from specie WHERE specie.id = ?),
        (SELECT base_speed from specie WHERE specie.id = ?),
        (SELECT base_stamina from specie WHERE specie.id = ?))
      `,
      [
        dragon.name,
        dragon.specie_id,
        dragon.profile_id,
        dragon.specie_id,
        dragon.specie_id,
        dragon.specie_id,
      ],
    );

    const dragonId = result.insertId;

    return dragonId;
  }

  // R of CRUD
  async readAll({ userId, profileId }: { userId: number; profileId: number }) {
    const [profileCheck] = await databaseClient.query<Rows>(
      `
      SELECT id
      FROM profile
      WHERE user_id = ? AND id = ?
      `,
      [userId, profileId],
    );

    if (profileCheck.length === 0)
      throw new Error("Profil non lié à cet utilisateur.");

    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT
        dragon.id as dragon_id,
        dragon.profile_id,
        specie.specie,
        dragon.name,
        dragon.adopted_at,
        dragon.strength,
        dragon.speed,
        dragon.stamina,
        specie.url_baby,
        specie.url_adult
      FROM dragon
      INNER JOIN specie ON specie.id = dragon.specie_id
      WHERE profile_id = ?
      `,
      [profileId],
    );

    return rows;
  }

  async read({
    userId,
    profileId,
    dragonId,
  }: { userId: number; profileId: number; dragonId: number }) {
    const [profileCheck] = await databaseClient.query<Rows>(
      `
      SELECT id
      FROM profile
      WHERE user_id = ? AND id = ?
      `,
      [userId, profileId],
    );

    if (profileCheck.length === 0)
      throw new Error("Profil non lié à cet utilisateur.");

    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT
        dragon.id as dragon_id,
        dragon.profile_id,
        specie.specie,
        dragon.name,
        dragon.adopted_at,
        dragon.strength,
        dragon.speed,
        dragon.stamina,
        specie.url_baby,
        specie.url_adult
      FROM dragon
      INNER JOIN specie ON specie.id = dragon.specie_id
      WHERE profile_id = ? AND dragon.id = ?
      `,
      [profileId, dragonId],
    );

    return rows[0];
  }

  // U of CRUD
  async update(dragon: Omit<Dragon, "specie_id">) {
    const [profileCheck] = await databaseClient.query<Rows>(
      `
      SELECT id
      FROM profile
      WHERE user_id = ? AND id = ?
      `,
      [dragon.user_id, dragon.profile_id],
    );

    if (profileCheck.length === 0)
      throw new Error("Profil non lié à cet utilisateur.");

    const [result] = await databaseClient.execute<Result>(
      `
      UPDATE dragon
      SET name = ?, strength = ?, speed = ?, stamina = ?
      WHERE profile_id = ? AND id = ?
      `,
      [
        dragon.name,
        dragon.strength,
        dragon.speed,
        dragon.stamina,
        dragon.profile_id,
        dragon.id,
      ],
    );

    return result.affectedRows > 0;
  }

  // D of CRUD
  async destroy({
    userId,
    profileId,
    dragonId,
  }: { userId: number; profileId: number; dragonId: number }) {
    const [profileCheck] = await databaseClient.query<Rows>(
      `
      SELECT id
      FROM profile
      WHERE user_id = ? AND id = ?
      `,
      [userId, profileId],
    );

    if (profileCheck.length === 0)
      throw new Error("Profil non lié à cet utilisateur.");

    const [result] = await databaseClient.execute<Result>(
      `
      DELETE FROM dragon
      WHERE profile_id = ? AND id = ?
      `,
      [profileId, dragonId],
    );

    return result.affectedRows;
  }
}

export default new dragonRepository();
