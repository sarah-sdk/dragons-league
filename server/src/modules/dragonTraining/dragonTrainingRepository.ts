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
        WHERE user_id = ? AND id = ?
        `,
        [
          dragonTraining.strength_earned,
          dragonTraining.speed_earned,
          dragonTraining.stamina_earned,
          dragonTraining.user_id,
          dragonTraining.dragon_id,
        ],
      );

      await connection.commit();

      const dragonTrainingId = result.insertId;

      return dragonTrainingId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // R of CRUD
  async readAll({ userId, dragonId }: { userId: number; dragonId: number }) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT
        dragon_training.id,
        dragon_training.dragon_id,
        training.training_type AS training_type,
        dragon_training.strength_earned,
        dragon_training.speed_earned,
        dragon_training.stamina_earned,
        dragon_training.doing_at
      FROM dragon_training
      INNER JOIN training ON training.id = dragon_training.training_id
      INNER JOIN dragon ON dragon.id = dragon_training.dragon_id
      WHERE dragon.user_id = ? AND dragon_training.dragon_id = ?
      `,
      [userId, dragonId],
    );

    return rows;
  }

  async read({
    userId,
    dragonId,
    trainingId,
  }: { userId: number; dragonId: number; trainingId: number }) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT
        dragon_training.id,
        dragon_training.dragon_id,
        training.training_type AS training_type,
        dragon_training.strength_earned,
        dragon_training.speed_earned,
        dragon_training.stamina_earned,
        dragon_training.doing_at
      FROM dragon_training
      INNER JOIN training ON training.id = dragon_training.training_id
      INNER JOIN dragon ON dragon.id = dragon_training.dragon_id
      WHERE dragon.user_id = ? AND dragon_training.dragon_id = ? AND dragon_training.id = ?
      `,
      [userId, dragonId, trainingId],
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
        WHERE user_id = ? AND id = ?
        `,
        [dragonTraining.user_id, dragonTraining.dragon_id],
      );

      const [previousStats] = await connection.query<Rows>(
        `
        SELECT dragon_training.strength_earned, dragon_training.speed_earned, dragon_training.stamina_earned
        FROM dragon_training
        INNER JOIN dragon ON dragon.id = dragon_training.dragon_id
        WHERE dragon_training.id = ? AND dragon_training.dragon_id = ? AND dragon.user_id = ?
        `,
        [dragonTraining.id, dragonTraining.dragon_id, dragonTraining.user_id],
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
        INNER JOIN dragon ON dragon.id = dragon_training.dragon_id
        SET strength_earned = ?, speed_earned = ?, stamina_earned = ?
        WHERE dragon_training.id = ? AND dragon_training.dragon_id = ? AND dragon.user_id = ?
        `,
        [
          dragonTraining.strength_earned,
          dragonTraining.speed_earned,
          dragonTraining.stamina_earned,
          dragonTraining.id,
          dragonTraining.dragon_id,
          dragonTraining.user_id,
        ],
      );

      await connection.execute(
        `
        UPDATE dragon
        SET strength = ?, speed = ?, stamina = ?
        WHERE id = ? AND user_id = ?
        `,
        [
          newStrength,
          newSpeed,
          newStamina,
          dragonTraining.dragon_id,
          dragonTraining.user_id,
        ],
      );

      await connection.commit();

      return true;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // D of CRUD
  async destroy({
    userId,
    dragonId,
    trainingId,
  }: { userId: number; dragonId: number; trainingId: number }) {
    const connection = await databaseClient.getConnection();

    try {
      await connection.beginTransaction();

      const [dragon] = await connection.query<Rows>(
        `
        SELECT strength, speed, stamina
        FROM dragon
        WHERE user_id = ? AND id = ?
        `,
        [userId, dragonId],
      );

      const [previousStats] = await connection.query<Rows>(
        `
        SELECT strength_earned, speed_earned, stamina_earned
        FROM dragon_training
        INNER JOIN dragon ON dragon_training.dragon_id = dragon.id
        WHERE dragon_training.id = ? AND dragon_training.dragon_id = ? AND dragon.user_id = ?
        `,
        [trainingId, dragonId, userId],
      );

      const newStrength = dragon[0].strength - previousStats[0].strength_earned;
      const newSpeed = dragon[0].speed - previousStats[0].speed_earned;
      const newStamina = dragon[0].stamina - previousStats[0].stamina_earned;

      await connection.execute(
        `
        UPDATE dragon
        SET strength = ?, speed = ?, stamina = ?
        WHERE id = ? AND user_id = ?
        `,
        [newStrength, newSpeed, newStamina, dragonId, userId],
      );

      await connection.execute(
        `
        DELETE dragon_training
        FROM dragon_training
        INNER JOIN dragon ON dragon_training.dragon_id = dragon.id
        WHERE dragon_training.id = ? AND dragon_training.dragon_id = ? AND dragon.user_id = ?
        `,
        [trainingId, dragonId, userId],
      );

      await connection.commit();

      return true;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

export default new dragonTrainingRepository();
