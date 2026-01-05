const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const USERS_PATH = "./users.json";

function readUsers() {
  return JSON.parse(fs.readFileSync(USERS_PATH, "utf8") || "[]");
}

function writeUsers(data) {
  fs.writeFileSync(USERS_PATH, JSON.stringify(data, null, 2));
}

// REGISTER
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  const users = readUsers();
  if (users.some(u => u.email === email)) {
    return res.status(400).json({ success: false });
  }

  const user = {
    id: Date.now(),
    name,
    email,
    password
  };

  users.push(user);
  writeUsers(users);

  res.json({
    success: true,
    user: { id: user.id, name, email }
  });
});

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const users = readUsers();
  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ success: false });
  }

  res.json({
    success: true,
    user: { id: user.id, name: user.name, email: user.email }
  });
});

// GET USER BY ID
router.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const users = readUsers();

  const user = users.find(u => u.id === Number(id));
  if (!user) {
    return res.status(404).json({ success: false });
  }

  const { password, ...safeUser } = user;
  res.json({ success: true, user: safeUser });
});

// DELETE USER
router.delete("/user/:id", (req, res) => {
  const userId = Number(req.params.id);
  if (!userId) {
    return res.status(400).json({ success: false, error: "ID inválido" });
  }

  // paths
  const usersPath = path.join(__dirname, "..", "users.json");
  const confirmationsPath = path.join(__dirname, "..", "confirmation.json");
  const notificationsPath = path.join(__dirname, "..", "notifications.json");

  // USERS
  const users = JSON.parse(fs.readFileSync(usersPath, "utf8") || "[]");
  const newUsers = users.filter(u => u.id !== userId);
  fs.writeFileSync(usersPath, JSON.stringify(newUsers, null, 2));

  // CONFIRMATIONS
  if (fs.existsSync(confirmationsPath)) {
    const confirmations = JSON.parse(
      fs.readFileSync(confirmationsPath, "utf8") || "[]"
    );

    const filtered = confirmations.filter(c => c.userId !== userId);
    fs.writeFileSync(confirmationsPath, JSON.stringify(filtered, null, 2));
  }

  // NOTIFICATIONS
  if (fs.existsSync(notificationsPath)) {
    const notifications = JSON.parse(
      fs.readFileSync(notificationsPath, "utf8") || "[]"
    );

    const filtered = notifications.filter(n => n.userId !== userId);
    fs.writeFileSync(notificationsPath, JSON.stringify(filtered, null, 2));
  }

  return res.json({
    success: true,
    message: "Usuário e dados relacionados removidos"
  });
});

module.exports = router;
