const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  res.json({ posts });
});
// crear
router.post("/", async (req, res) => {
  try {
    const post = await prisma.post.create({
      data: req.body,
    });
    res.json({ post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
