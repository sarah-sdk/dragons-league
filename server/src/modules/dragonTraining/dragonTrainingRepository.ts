import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { DragonTraining } from "../../types/types";

class dragonTrainingRepository {
  // C of CRUD
  async create(dragonTraining: Omit<DragonTraining, "id">) {
    const connection = await databaseClient.getConnection();

    try {
      await connection.beginTransaction();

      const [result] = await connection.execute<Result>(
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

      await connection.execute(
        `
        UPDATE dragon
        SET strength = strength + ?, speed = speed + ?, stamina = stamina + ?
        WHERE id = ?
        `,
        [
          dragonTraining.strength_earned,
          dragonTraining.speed_earned,
          dragonTraining.stamina_earned,
          dragonTraining.dragon_id,
        ],
      );

      await connection.commit();

      const dragonTrainingId = result.insertId;

      return dragonTrainingId;
    } catch (error) {
      await connection.rollback();
    } finally {
      connection.release();
    }
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
      WHERE dragon_id = ? AND id = ?
      `,
      [dragonId, trainingId],
    );

    return rows[0];
  }

  // U of CRUD
  async update(dragonTraining: Omit<DragonTraining, "training_id">) {
    const connection = await databaseClient.getConnection();

    try {
      await connection.beginTransaction();

      const [dragon] = await connection.query<Rows>(
        `
        SELECT strength, speed, stamina
        FROM dragon
        WHERE id = ?
        `,
        [dragonTraining.dragon_id],
      );

      const [previousStats] = await connection.query<Rows>(
        `
        SELECT strength_earned, speed_earned, stamina_earned
        FROM dragon_training
        WHERE id = ? AND dragon_id = ?
        `,
        [dragonTraining.id, dragonTraining.dragon_id],
      );

      const newStrength =
        dragon[0].strength -
        previousStats[0].strength_earned +
        dragonTraining.strength_earned;
      const newSpeed =
        dragon[0].speed -
        previousStats[0].speed_earned +
        dragonTraining.speed_earned;
      const newStamina =
        dragon[0].stamina -
        previousStats[0].stamina_earned +
        dragonTraining.stamina_earned;

      await connection.execute(
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

      await connection.execute(
        `
        UPDATE dragon
        SET strength = ?, speed = ?, stamina = ?
        WHERE id = ?
        `,
        [newStrength, newSpeed, newStamina, dragonTraining.dragon_id],
      );

      await connection.commit();

      return true;
    } catch (error) {
      await connection.rollback;
      throw error;
    } finally {
      connection.release();
    }
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
