import { PrismaClient } from "@prisma/client";
import { compareSentences } from "../../utils/helper.js";

const prisma = new PrismaClient();

export class QuizzesController {
  async store(req, res) {
    const {
      user_id,
      title,
      topic,
      quiz,
      soltion_correct,
      soltion_one,
      soltion_two,
      soltion_three,
    } = req.body;

    console.log();
    try {
      await prisma.quizzes.create({
        data: {
          userId: user_id,
          title: title,
          topic: topic,
          quiz: quiz,
          soltion_correct: soltion_correct,
          soltion_one: soltion_one,
          soltion_two: soltion_two,
          soltion_three: soltion_three,
        },
      });

      return res.status(201).json({ message: "quiz created successfully" });
    } catch (error) {
      console.error("Error creating quiz: ", error);
      return res.status(500).json({ message: "Failed to create quiz" });
    }
  }

  async view(req, res) {
    try {
      const quizzes = await prisma.quizzes.findMany({
        include: {
          users: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      return res.status(200).json({ quizzes });
    } catch (error) {
      console.error("Error getting quizzes:", error);
      return res.status(500).json({ message: "Failed to get quizzes" });
    }
  }
  async get(req, res) {
    const { id } = req.params;
    try {
      const quiz = await prisma.quizzes.findMany({
        where: { id: id },
      });

      return res.status(200).json({ quiz });
    } catch (error) {
      console.error("Error getting quiz:", error);
      return res.status(500).json({ message: "Failed to get quiz" });
    }
  }
  async update(req, res) {
    const { id } = req.params;
    const {
      user_id,
      title,
      topic,
      quiz,
      soltion_correct,
      soltion_one,
      soltion_two,
      soltion_three,
    } = req.body;
    try {
      await prisma.quizzes.update({
        where: {
          id: id,
        },
        data: {
          userId: user_id,
          title: title,
          topic: topic,
          quiz: quiz,
          soltion_correct: soltion_correct,
          soltion_one: soltion_one,
          soltion_two: soltion_two,
          soltion_three: soltion_three,
        },
      });
      return res.status(200).json({ message: "Updated quiz" });
    } catch (error) {
      console.error("Error updating quiz :", error);
      return res.status(500).json({ message: "Failed to update quiz" });
    }
  }
  async delete(req, res) {
    const { id } = req.params;
    try {
      await prisma.quizzes.delete({
        where: {
          id: id,
        },
      });
      return res.status(200).json({ message: "Deleted quiz" });
    } catch (error) {
      console.error("Error deleting quizz:", error);
      return res.status(500).json({ message: "Failed to deleting quiz" });
    }
  }

  async solve(req, res) {
    const { id } = req.params;
    const { solution } = req.body;
    try {
      const getQuiz = await prisma.quizzes.findUnique({
        where: { id: id },
        select: { soltion_correct: true },
      });
      const result =  compareSentences(getQuiz.soltion_correct, solution);
      return res.status(200).json({ result });
    } catch (error) {
      return res.status(500).json({ message: "error...." });
    }
  }
}
