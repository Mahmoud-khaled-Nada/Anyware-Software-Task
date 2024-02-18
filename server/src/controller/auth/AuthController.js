import { PrismaClient } from "@prisma/client";
import {
  comparePassword,
  generateToken,
  hashPassword,
} from "../../utils/helper.js";

const prisma = new PrismaClient();

export class AuthController {
  async register(req, res) {
    const { name, email, password } = req.body;
    try {
      // Hash the password
      const hashedPassword = await hashPassword(password);
      await prisma.users.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });

      return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error("Error registering user:", error);
      return res.status(500).json({ message: "Failed to register user" });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await prisma.users.findFirst({
        where: { email: email },
      });
      const comparedPassword = await comparePassword(password, user?.password);
      if (!user || !comparedPassword) {
        return res.status(400).json({ error: "Invalid username or password" });
      }
      // This object is in order to avoid returning the password for protection.
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      const token = generateToken(userData);

      return res.status(201).json({
        token: token,
        data: userData,
      });
    } catch (error) {
      console.error("Error login user:", error);
      return res.status(500).json({ message: "Failed to login user" });
    }
  }

  getUserProfile(req, res) {
    const user = req.user;
    const userObjcte = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    res.json(userObjcte);
  }
  logout(req, res) {
    try {
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.log("Error in logout controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await prisma.users.findMany();
      res.status(200).json({ users });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
