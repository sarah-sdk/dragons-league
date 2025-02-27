import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
const JWT_EXPIRATION = "1h";

export const generateToken = (email: string) => {
  const payload = { email };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
  return token;
};
