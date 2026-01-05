const express = require("express");
const fs = require("fs");
const router = express.Router();

router.post("/", (req, res) => {
  const { name, email, phone, message } = req.body;

  const usersFile = "./users.json";
  const users = JSON.parse(fs.readFileSync(usersFile, "utf8"));
  const user = users[users.length - 1];
  
  const notification = {
    id: Date.now(),
    from: "Pluggy Support",
    userId: user.id,
    to: name,
    email,
    text: `Olá, ${name}! Seja muito bem-vindo(a) à nossa loja! 😊`,
    date: `${new Date().getDate().toString().padStart(2, '0')}/${(new Date().getMonth() + 1).toString().padStart(2, '0')}/${new Date().getFullYear()}`
  };

  const file = "./notifications.json";

  let notifications = [];

  try {
    const fileData = fs.readFileSync(file, "utf8");
    notifications = JSON.parse(fileData || "[]");
  } catch (err) {
    notifications = [];
  }

  notifications.push(notification);

  fs.writeFileSync(file, JSON.stringify(notifications, null, 2));

  return res.json({ success: true, notification });
});

module.exports = router;
