import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { Specie } from "../../types/types";

class specieRepository {
  // C of CRUD
  async create(specie: Omit<Specie, "id">) {}

  // R of CRUD
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT id, specie, base_strength, base_speed, base_stamina, url_baby, url_adult
      FROM specie
      `,
    );

    return rows;
  }

  async read(id: number) {}

  // U of CRUD
  async update(specie: Specie) {}

  // D of CRUD
  async destroy(id: number) {}
}

export default new specieRepository();
