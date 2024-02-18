import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AnnouncementController {
  async store(req, res) {
    const { user_id, announcement_body } = req.body;
    try {
      await prisma.announcement.create({
        data: {
          userId: user_id,
          body: announcement_body,
        },
      });

      return res
        .status(201)
        .json({ message: "Announcement created successfully" });
    } catch (error) {
      console.error("Error creating announcement:", error);
      return res.status(500).json({ message: "Failed to create announcement" });
    }
  }

  async view(req, res) {
    try {
      const data = await prisma.announcement.findMany({
        include: {
          users: true,
        },
      });

      return res.status(200).json({ data });
    } catch (error) {
      console.error("Error getting announcements:", error);
      return res.status(500).json({ message: "Failed to get announcements" });
    }
  }

  async edit(req, res) {
    const { id } = req.params;
    try {
      const getData = await prisma.announcement.findUnique({
        where: {
          id: id,
        },
        select: {
          body: true,
        },
      });

      return res.status(200).json({ getData });
    } catch (error) {
      console.error("Error getting announcement:", error);
      return res.status(500).json({ message: "Failed to get announcement" });
    }
  }
  async update(req, res) {
    const { id } = req.params;
    const { edit_announcement_body } = req.body;
    try {
      await prisma.announcement.update({
        where: {
          id: id,
        },
        data: {
          body: edit_announcement_body,
        },
      });
      return res.status(200).json({ message: "Updated announcement" });
    } catch (error) {
      console.error("Error updating announcement:", error);
      return res.status(500).json({ message: "Failed to update announcement" });
    }
  }
  async delete(req, res) {
    const { id } = req.params;
    try {
      await prisma.announcement.delete({
        where: {
          id: id,
        },
      });
      return res.status(200).json({ message: "Deleted announcement" });
    } catch (error) {
      console.error("Error deleting announcement:", error);
      return res
        .status(500)
        .json({ message: "Failed to deleting announcement" });
    }
  }
}
