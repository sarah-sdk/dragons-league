import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { User } from "../../types/types";

class authRepository {
  async create(user: Omit<User, "id">) {
    const [result] = await databaseClient.execute<Result>(
      `
      INSERT INTO user (email, password, is_admin)
      VALUES (?, ?, ?)
      `,
      [user.email, user.password, user.isAdmin],
    );

    const newUser = {
      id: result.insertId,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    return newUser;
  }

  async getUserByEmail(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT id, email, password, is_admin
      FROM user
      WHERE email = ?
      `,
      [email],
    );

    if (rows.length === 0) return null;

    const user = rows[0];

    return {
      id: user.id,
      email: user.email,
      password: user.password,
      isAdmin: Boolean(user.is_admin),
    };
  }
}

export default new authRepository();
