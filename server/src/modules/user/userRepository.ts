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

  // U of CRUD

  // D of CRUD
}

export default new userRepository();
