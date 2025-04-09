import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { Specie } from "../../types/types";

class specieRepository {
  // C of CRUD
  async create(specie: Omit<Specie, "id">) {
    const [result] = await databaseClient.execute<Result>(
      `
      INSERT INTO specie (specie, base_strength, base_speed, base_stamina, url_baby, url_adult)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        specie.specie,
        specie.baseStrength,
        specie.baseSpeed,
        specie.baseStamina,
        specie.urlBaby,
        specie.urlAdult,
      ],
    );

    const specieId = result.insertId;

    return specieId;
  }

  // R of CRUD
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT id, specie, base_strength, base_speed, base_stamina, url_baby, url_adult
      FROM specie
      `,
    );

    return rows.map((specie) => ({
      id: specie.id,
      specie: specie.specie,
      baseStrength: specie.base_strength,
      baseSpeed: specie.base_speed,
      baseStamina: specie.base_stamina,
      urlBaby: specie.url_baby,
      urlAdult: specie.url_adult,
    }));
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT id, specie, base_strength, base_speed, base_stamina, url_baby, url_adult
      FROM specie
      WHERE id = ?
      `,
      [id],
    );

    const specie = rows[0];

    return {
      id: specie.id,
      specie: specie.specie,
      baseStrength: specie.base_strength,
      baseSpeed: specie.base_speed,
      baseStamina: specie.base_stamina,
      urlBaby: specie.url_baby,
      urlAdult: specie.url_adult,
    };
  }

  // U of CRUD
  async update(specie: Specie) {
    const [result] = await databaseClient.execute<Result>(
      `
      UPDATE specie
      SET specie = ?, base_strength = ?, base_speed = ?, base_stamina = ?, url_baby = ?, url_adult = ?
      WHERE id = ?
      `,
      [
        specie.specie,
        specie.baseStrength,
        specie.baseSpeed,
        specie.baseStamina,
        specie.urlBaby,
        specie.urlAdult,
        specie.id,
      ],
    );

    return result.affectedRows > 0;
  }

  // D of CRUD
  async destroy(id: number) {
    const [result] = await databaseClient.execute<Result>(
      `
      DELETE FROM specie
      WHERE id = ?
      `,
      [id],
    );

    return result.affectedRows;
  }
}

export default new specieRepository();
