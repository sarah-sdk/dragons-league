import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { DragonTraining } from "../../types/types";

class dragonTrainingRepository {
  // C of CRUD
  async create(dragonTraining: Omit<DragonTraining, "id">) {
    const [result] = await databaseClient.execute<Result>(
      `
      INSERT INTO dragon_training (dragon_id, training_id, strength_earned, speed_earned, stamina_earned)
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        dragonTraining.dragon_id,
        dragonTraining.training_id,
        dragonTraining.strength_earned,
        dragonTraining.speed_earned,
        dragonTraining.stamina_earned,
      ],
    );

    const dragonTrainingId = result.insertId;

    return dragonTrainingId;
  }

  // R of CRUD
  async readAll(dragonId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT id, dragon_id, training_id, strength_earned, speed_earned, stamina_earned, doing_at
      FROM dragon_training
      WHERE dragon_id = ?
      `,
      [dragonId],
    );

    return rows;
  }

  async read({
    dragonId,
    trainingId,
  }: { dragonId: number; trainingId: number }) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT id, dragon_id, training_id, strength_earned, speed_earned, stamina_earned, doing_at
      FROM dragon_training
      WHERE dragon_id = ? AND training_id = ?
      `,
      [dragonId, trainingId],
    );

    return rows[0];
  }

  // U of CRUD
  async update(dragonTraining: Omit<DragonTraining, "training_id">) {
    const [result] = await databaseClient.execute<Result>(
      `
      UPDATE dragon_training
      SET strength_earned = ?, speed_earned = ?, stamina_earned = ? 
      WHERE id = ? AND dragon_id = ?
      `,
      [
        dragonTraining.strength_earned,
        dragonTraining.speed_earned,
        dragonTraining.stamina_earned,
        dragonTraining.id,
        dragonTraining.dragon_id,
      ],
    );

    return result.affectedRows > 0;
  }

  // D of CRUD
  async destroy({
    dragonId,
    trainingId,
  }: { dragonId: number; trainingId: number }) {
    const [result] = await databaseClient.execute<Result>(
      `
      DELETE FROM dragon_training
      WHERE id = ? AND dragon_id = ?
      `,
      [trainingId, dragonId],
    );

    return result.affectedRows;
  }
}

export default new dragonTrainingRepository();
