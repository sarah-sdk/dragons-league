import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { DragonTraining } from "../../types/types";

class dragonTrainingRepository {
  // C of CRUD
  async create(dragonTraining: Omit<DragonTraining, "id">) {
    const connection = await databaseClient.getConnection();

    const [profileCheck] = await connection.query<Rows>(
      `
      SELECT id
      FROM profile
      WHERE user_id = ? AND id = ?
      `,
      [dragonTraining.userId, dragonTraining.profileId],
    );

    if (profileCheck.length === 0)
      throw new Error("Profil non lié à cet utilisateur.");

    const [dragonCheck] = await connection.query<Rows>(
      `
      SELECT id
      FROM dragon
      WHERE profile_id = ? AND id = ?
      `,
      [dragonTraining.profileId, dragonTraining.dragonId],
    );

    if (dragonCheck.length === 0)
      throw new Error("Dragon non lié à ce profil.");

    try {
      await connection.beginTransaction();

      const [result] = await connection.execute<Result>(
        `
        INSERT INTO dragon_training (dragon_id, training_id, strength_earned, speed_earned, stamina_earned)
        VALUES (?, ?, ?, ?, ?)
        `,
        [
          dragonTraining.dragonId,
          dragonTraining.trainingId,
          dragonTraining.strengthEarned,
          dragonTraining.speedEarned,
          dragonTraining.staminaEarned,
        ],
      );

      await connection.execute(
        `
        UPDATE dragon
        SET strength = strength + ?, speed = speed + ?, stamina = stamina + ?
        WHERE profile_id = ? AND id = ?
        `,
        [
          dragonTraining.strengthEarned,
          dragonTraining.speedEarned,
          dragonTraining.staminaEarned,
          dragonTraining.profileId,
          dragonTraining.dragonId,
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
  async readAll({
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

    const [dragonCheck] = await databaseClient.query<Rows>(
      `
      SELECT id
      FROM dragon
      WHERE profile_id = ? AND id = ?
      `,
      [profileId, dragonId],
    );

    if (dragonCheck.length === 0)
      throw new Error("Dragon non lié à ce profil.");

    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT
        dragon_training.id,
        dragon_training.dragon_id,
        training.type AS training_type,
        dragon_training.strength_earned,
        dragon_training.speed_earned,
        dragon_training.stamina_earned,
        dragon_training.doing_at
      FROM dragon_training
      INNER JOIN training ON training.id = dragon_training.training_id
      INNER JOIN dragon ON dragon.id = dragon_training.dragon_id
      WHERE dragon.profile_id = ? AND dragon_training.dragon_id = ?
      `,
      [profileId, dragonId],
    );

    return rows.map((dragonTraining) => ({
      id: dragonTraining.id,
      dragonId: dragonTraining.dragon_id,
      trainingType: dragonTraining.training_type,
      strengthEarned: dragonTraining.strength_earned,
      speedEarned: dragonTraining.speed_earned,
      staminaEarned: dragonTraining.stamina_earned,
      doingAt: dragonTraining.doing_at,
    }));
  }

  async read({
    userId,
    profileId,
    dragonId,
    trainingId,
  }: {
    userId: number;
    profileId: number;
    dragonId: number;
    trainingId: number;
  }) {
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

    const [dragonCheck] = await databaseClient.query<Rows>(
      `
      SELECT id
      FROM dragon
      WHERE profile_id = ? AND id = ?
      `,
      [profileId, dragonId],
    );

    if (dragonCheck.length === 0)
      throw new Error("Dragon non lié à ce profil.");

    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT
        dragon_training.id,
        dragon_training.dragon_id,
        training.type AS training_type,
        dragon_training.strength_earned,
        dragon_training.speed_earned,
        dragon_training.stamina_earned,
        dragon_training.doing_at
      FROM dragon_training
      INNER JOIN training ON training.id = dragon_training.training_id
      INNER JOIN dragon ON dragon.id = dragon_training.dragon_id
      WHERE dragon.profile_id = ? AND dragon_training.dragon_id = ? AND dragon_training.id = ?
      `,
      [profileId, dragonId, trainingId],
    );

    const dragonTraining = rows[0];

    return {
      id: dragonTraining.id,
      dragonId: dragonTraining.dragon_id,
      trainingType: dragonTraining.training_type,
      strengthEarned: dragonTraining.strength_earned,
      speedEarned: dragonTraining.speed_earned,
      staminaEarned: dragonTraining.stamina_earned,
      doingAt: dragonTraining.doing_at,
    };
  }

  // U of CRUD
  async update(dragonTraining: Omit<DragonTraining, "trainingId">) {
    const connection = await databaseClient.getConnection();

    const [profileCheck] = await connection.query<Rows>(
      `
      SELECT id
      FROM profile
      WHERE user_id = ? AND id = ?
      `,
      [dragonTraining.userId, dragonTraining.profileId],
    );

    if (profileCheck.length === 0)
      throw new Error("Profil non lié à cet utilisateur.");

    const [dragonCheck] = await connection.query<Rows>(
      `
      SELECT id
      FROM dragon
      WHERE profile_id = ? AND id = ?
      `,
      [dragonTraining.profileId, dragonTraining.dragonId],
    );

    if (dragonCheck.length === 0)
      throw new Error("Dragon non lié à ce profil.");

    try {
      await connection.beginTransaction();

      const [dragon] = await connection.query<Rows>(
        `
        SELECT strength, speed, stamina
        FROM dragon
        WHERE profile_id = ? AND id = ?
        `,
        [dragonTraining.profileId, dragonTraining.dragonId],
      );

      const [previousStats] = await connection.query<Rows>(
        `
        SELECT dragon_training.strength_earned, dragon_training.speed_earned, dragon_training.stamina_earned
        FROM dragon_training
        INNER JOIN dragon ON dragon.id = dragon_training.dragon_id
        WHERE dragon_training.id = ? AND dragon_training.dragon_id = ? AND dragon.profile_id = ?
        `,
        [dragonTraining.id, dragonTraining.dragonId, dragonTraining.profileId],
      );

      const newStrength =
        dragon[0].strength -
        previousStats[0].strengthEarned +
        dragonTraining.strengthEarned;
      const newSpeed =
        dragon[0].speed -
        previousStats[0].speedEarned +
        dragonTraining.speedEarned;
      const newStamina =
        dragon[0].stamina -
        previousStats[0].staminaEarned +
        dragonTraining.staminaEarned;

      await connection.execute(
        `
        UPDATE dragon_training
        INNER JOIN dragon ON dragon.id = dragon_training.dragon_id
        SET strength_earned = ?, speed_earned = ?, stamina_earned = ?
        WHERE dragon_training.id = ? AND dragon_training.dragon_id = ? AND dragon.profile_id = ?
        `,
        [
          dragonTraining.strengthEarned,
          dragonTraining.speedEarned,
          dragonTraining.staminaEarned,
          dragonTraining.id,
          dragonTraining.dragonId,
          dragonTraining.profileId,
        ],
      );

      await connection.execute(
        `
        UPDATE dragon
        SET strength = ?, speed = ?, stamina = ?
        WHERE id = ? AND profile_id = ?
        `,
        [
          newStrength,
          newSpeed,
          newStamina,
          dragonTraining.dragonId,
          dragonTraining.profileId,
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
    profileId,
    dragonId,
    trainingId,
  }: {
    userId: number;
    profileId: number;
    dragonId: number;
    trainingId: number;
  }) {
    const connection = await databaseClient.getConnection();

    const [profileCheck] = await connection.query<Rows>(
      `
      SELECT id
      FROM profile
      WHERE user_id = ? AND id = ?
      `,
      [userId, profileId],
    );

    if (profileCheck.length === 0)
      throw new Error("Profil non lié à cet utilisateur.");

    const [dragonCheck] = await connection.query<Rows>(
      `
      SELECT id
      FROM dragon
      WHERE profile_id = ? AND id = ?
      `,
      [profileId, dragonId],
    );

    if (dragonCheck.length === 0)
      throw new Error("Dragon non lié à ce profil.");

    try {
      await connection.beginTransaction();

      const [dragon] = await connection.query<Rows>(
        `
        SELECT strength, speed, stamina
        FROM dragon
        WHERE profile_id = ? AND id = ?
        `,
        [profileId, dragonId],
      );

      const [previousStats] = await connection.query<Rows>(
        `
        SELECT strength_earned, speed_earned, stamina_earned
        FROM dragon_training
        INNER JOIN dragon ON dragon_training.dragon_id = dragon.id
        WHERE dragon_training.id = ? AND dragon_training.dragon_id = ? AND dragon.profile_id = ?
        `,
        [trainingId, dragonId, profileId],
      );

      const newStrength = dragon[0].strength - previousStats[0].strengthEarned;
      const newSpeed = dragon[0].speed - previousStats[0].speedEarned;
      const newStamina = dragon[0].stamina - previousStats[0].staminaEarned;

      await connection.execute(
        `
        UPDATE dragon
        SET strength = ?, speed = ?, stamina = ?
        WHERE id = ? AND profile_id = ?
        `,
        [newStrength, newSpeed, newStamina, dragonId, profileId],
      );

      await connection.execute(
        `
        DELETE dragon_training
        FROM dragon_training
        INNER JOIN dragon ON dragon_training.dragon_id = dragon.id
        WHERE dragon_training.id = ? AND dragon_training.dragon_id = ? AND dragon.profile_id = ?
        `,
        [trainingId, dragonId, profileId],
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
