import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { Dragon } from "../../types/types";

class dragonRepository {
  // C of CRUD
  async create(dragon: Omit<Dragon, "id" | "strength" | "speed" | "stamina">) {
    const [result] = await databaseClient.execute<Result>(
      `
      INSERT INTO dragon (name, specie_id, user_id, strength, speed, stamina)
      VALUES (?, ?, ?,
        (SELECT base_strength from specie WHERE specie.id = ?),
        (SELECT base_speed from specie WHERE specie.id = ?),
        (SELECT base_stamina from specie WHERE specie.id = ?))
      `,
      [
        dragon.name,
        dragon.specie_id,
        dragon.user_id,
        dragon.specie_id,
        dragon.specie_id,
        dragon.specie_id,
      ],
    );

    const dragonId = result.insertId;

    return dragonId;
  }

  // R of CRUD
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT
        dragon.id as dragon_id,
        dragon.user_id,
        specie_specie AS specie,
        dragon.name,
        dragon.adopted_at,
        dragon.strength,
        dragon.speed,
        dragon.stamina,
        specie.url_baby,
        specie.url_adult
      FROM dragon
      INNER JOIN specie ON specie.id = dragon.specie_id
      `,
    );

    return rows;
  }

  async readAllByUser(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT
        dragon.id as dragon_id,
        dragon.user_id,
        specie_specie AS specie,
        dragon.name,
        dragon.adopted_at,
        dragon.strength,
        dragon.speed,
        dragon.stamina,
        specie.url_baby,
        specie.url_adult
      FROM dragon
      INNER JOIN specie ON specie.id = dragon.specie_id
      WHERE dragon.user_id = ?
      `,
      [userId],
    );

    return rows;
  }

  async read({ userId, dragonId }: { userId: number; dragonId: number }) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT
        dragon.id as dragon_id,
        dragon.user_id,
        specie_specie AS specie,
        dragon.name,
        dragon.adopted_at,
        dragon.strength,
        dragon.speed,
        dragon.stamina,
        specie.url_baby,
        specie.url_adult
      FROM dragon
      INNER JOIN specie ON specie.id = dragon.specie_id
      WHERE user_id = ? AND dragon.id = ?
      `,
      [userId, dragonId],
    );

    return rows[0];
  }

  // U of CRUD
  async update(dragon: Omit<Dragon, "specie_id">) {
    const [result] = await databaseClient.execute<Result>(
      `
      UPDATE dragon
      SET name = ?, strength = ?, speed = ?, stamina = ?
      WHERE user_id = ? AND id = ?
      `,
      [
        dragon.name,
        dragon.strength,
        dragon.speed,
        dragon.stamina,
        dragon.user_id,
        dragon.id,
      ],
    );

    return result.affectedRows > 0;
  }

  // D of CRUD
  async destroy({ userId, dragonId }: { userId: number; dragonId: number }) {
    const [result] = await databaseClient.execute<Result>(
      `
      DELETE FROM dragon
      WHERE user_id = ? AND id = ?
      `,
      [userId, dragonId],
    );

    return result.affectedRows;
  }
}

export default new dragonRepository();
