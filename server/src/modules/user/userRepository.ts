import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { User } from "../../types/types";

class userRepository {
  // C of CRUD
  async create(user: Omit<User, "id">) {
    const [result] = await databaseClient.execute<Result>(
      `
      INSERT INTO user (email, password, is_admin)
      VALUES (?, ?, ?)
      `,
      [user.email, user.password, user.isAdmin],
    );

    const userId = result.insertId;

    return userId;
  }

  // R of CRUD
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT id, email, is_admin, created_at
      FROM user
      `,
    );

    return rows.map((user) => ({
      id: user.id,
      email: user.email,
      isAdmin: Boolean(user.is_admin),
      createdAt: user.created_at,
    }));
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT id, email, is_admin, created_at
      FROM user
      WHERE id = ?
      `,
      [id],
    );

    const user = rows[0];

    return {
      id: user.id,
      email: user.email,
      isAdmin: Boolean(user.is_admin),
      createdAt: user.created_at,
    };
  }

  // U of CRUD
  async update(user: Omit<User, "isAdmin">) {
    const [result] = await databaseClient.execute<Result>(
      `
      UPDATE user
      SET email = ?, password = ?
      WHERE id = ?
      `,
      [user.email, user.password, user.id],
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
