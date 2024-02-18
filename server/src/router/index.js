import express from "express";
import { AuthController } from "../controller/auth/AuthController.js";
import {
  authMiddleware,
  registerMiddleware,
} from "../middleware/AuthMiddleware.js";
import { AnnouncementController } from "../controller/announcement/AnnouncementController.js";
import { QuizzesController } from "../controller/quizzes/QuizzesController.js";

const router = express.Router();
const auth = new AuthController();
const announcement = new AnnouncementController();
const quizzes = new QuizzesController();

// auth router
router.post("/auth/register", registerMiddleware, auth.register);
router.post("/auth/login", auth.login);
router.post("/auth/logout", auth.logout);
router.get("/auth/user", authMiddleware, auth.getUserProfile);
router.get("/auth/all/user",  auth.getAllUsers);

// announcement router
router.post("/announcement/create", announcement.store);
router.get("/announcement", announcement.view);
router.get("/announcement/edit/:id", announcement.edit);
router.put("/announcement/update/:id", announcement.update);
router.delete("/announcement/delete/:id", announcement.delete);

// quizzes router
router.post("/quizzes/create", quizzes.store);
router.get("/quizzes", quizzes.view);
router.get("/quizzes/get/:id", quizzes.get);
router.put("/quizzes/update/:id", quizzes.update);
router.delete("/quizzes/delete/:id", quizzes.delete);
router.post("/quizzes/solve/:id", quizzes.solve);

export default router;
