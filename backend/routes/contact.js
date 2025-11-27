const express = require("express");
const fs = require("fs");
const router = express.Router();

router.post("/", (req, res) => {
  const { name, email, phone, message } = req.body;

  const notification = {
    id: Date.now(),
    de: "Pluggy Support",
    to: name,
    text: `Olá, ${name}! Seja muito bem-vindo(a)! 😊 Recebemos sua mensagem e em breve entraremos em contato`,
    date: `${new Date().getDate().toString().padStart(2, '0')}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getFullYear()}`
  };

  const file = "./notifications.json";

  let notifications = [];

  try {
    const fileData = fs.readFileSync(file, "utf8");
    notifications = JSON.parse(fileData || "[]");
  } catch (err) {
    console.error("⚠️ Erro ao ler notifications.json, recriando arquivo...", err);
    notifications = [];
  }

  notifications.push(notification);

  fs.writeFileSync(file, JSON.stringify(notifications, null, 2));

  return res.json({ success: true, notification });
});

module.exports = router;
