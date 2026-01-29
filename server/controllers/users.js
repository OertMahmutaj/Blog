const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", { title: 1 });

  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const user = await User.findById(id).populate("blogs", { title: 1 });
  if (!user) return res.status(404).json({ error: "user not found" });
  response.json(user);
});

module.exports = usersRouter;
