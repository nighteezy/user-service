import * as jwt from "jsonwebtoken";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not set in environment variables");
}

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (userId: string, role: string) => {
  return jwt.sign({ id: userId, role }, JWT_SECRET, { expiresIn: "24h" });
};

export const verifyToken = (
  token: string
): { id: string; role: string } | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as { id: string; role: string };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.warn("JWT Error: Token has expired");
    } else if (error instanceof jwt.JsonWebTokenError) {
      console.warn(`JWT Error: ${error.message}`);
    } else if (error instanceof jwt.NotBeforeError) {
      console.warn("JWT Error: Token is not active yet");
    } else {
      console.error("Unexpected JWT verification error:", error);
    }
    return null;
  }
};
