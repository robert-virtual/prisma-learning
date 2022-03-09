const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { hash } = require("argon2");

router.get("/", async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      password: false,
    },
  });
  res.json({ users });
});

// crear
router.post("/", async (req, res) => {
  let { password } = req.body;
  password = await hash(password);

  const user = await prisma.user.create({ data: { ...req.body, password } });
  res.json({ user });
});

module.exports = router;
