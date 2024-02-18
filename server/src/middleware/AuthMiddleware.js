import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export const registerMiddleware = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required." });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long." });
  }

  try {
    const existingUser = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    next();
  } catch (error) {
    console.error("Error checking email uniqueness:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("Authorization token not provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.data.id;

    const user = await prisma.users.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    res.status(401).json({ message: "Unauthorized" });
  }
};
