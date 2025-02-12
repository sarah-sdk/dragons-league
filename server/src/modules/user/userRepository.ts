import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { User } from "../../types/types";

class userRepository {
  // C of CRUD
  async create(user: Omit<User, "id">) {
    const [result] = await databaseClient.execute<Result>(
      `
      INSERT INTO user (username, email, password)
      VALUES (?, ?, ?)
      `,
      [user.username, user.email, user.password],
    );

    const userId = result.insertId;

    return userId;
  }

  // R of CRUD
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT id, username, email, created_at
      FROM user
      `,
    );

    return rows;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT id, username, email, created_at
      FROM user
      WHERE id = ?
      `,
      [id],
    );

    return rows[0];
  }

  // U of CRUD
  async update(user: User) {
    const [result] = await databaseClient.execute<Result>(
      `
      UPDATE user
      SET username = ?, email = ?, password = ?
      WHERE id = ?
      `,
      [user.username, user.email, user.password, user.id],
    );

    return result.affectedRows > 0;
  }

  // D of CRUD
  async destroy(id: number) {
    const [result] = await databaseClient.execute<Result>(
      `
      DELETE FROM user
      WHERE id = ?
      `,
      [id],
    );

    return result.affectedRows;
  }
}

export default new userRepository();
