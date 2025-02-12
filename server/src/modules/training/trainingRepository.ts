import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { Training } from "../../types/types";

class trainingRepository {
  // C of CRUD
  async create(training: Omit<Training, "id">) {
    const [result] = await databaseClient.execute<Result>(
      `
      INSERT INTO training (training_type)
      VALUES (?)
      `,
      [training.training_type],
    );

    const trainingId = result.insertId;

    return trainingId;
  }

  // R of CRUD
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT id, training_type
      FROM training
      `,
    );

    return rows;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT id, training_type
      FROM training
      WHERE id = ?
      `,
      [id],
    );

    return rows[0];
  }

  // U of CRUD
  async update(training: Training) {
    const [result] = await databaseClient.execute<Result>(
      `
      UPDATE training
      SET training_type = ?
      WHERE id = ?
      `,
      [training.training_type, training.id],
    );

    return result.affectedRows > 0;
  }

  // D of CRUD
  async destroy(id: number) {
    const [result] = await databaseClient.execute<Result>(
      `
      DELETE FROM training
      WHERE id = ?
      `,
      [id],
    );

    return result.affectedRows;
  }
}

export default new trainingRepository();
