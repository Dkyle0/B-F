const bcrypt = require("bcrypt");
const User = require("../models/User");
const roles = require("../constants/roles");
const { generate } = require("../helpers/token");

async function register(login, password) {
  if (!password) {
    throw new Error("Pasword is empty");
  }
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({ login, password: passwordHash });
  const token = generate({ id: user.id });

  return { token, user };
}

async function login(login, password) {
  const user = await User.findOne({ login });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Wrong password");
  }

  const token = generate({ id: user.id });

  return { token, user };
}

function getUsers() {
  return User.find();
}

function getRoles() {
  return [
    {
      id: roles.ADMIN,
      name: "Admin",
    },
    {
      id: roles.MODERATOR,
      name: "Moderator",
    },
    {
      id: roles.USER,
      name: "User",
    },
  ];
}

function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

function updateUser(id, userData) {
  return User.findByIdAndUpdate(id, userData, { returnDocument: "after" });
}

module.exports = {
  register,
  login,
  getUsers,
  getRoles,
  deleteUser,
  updateUser,
};
