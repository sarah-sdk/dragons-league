import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
const JWT_EXPIRATION = "1h";

export const generateToken = (userEmail: string, isAdmin: boolean) => {
  const payload = { userEmail, isAdmin };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
  return token;
};
