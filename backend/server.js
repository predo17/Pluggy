const express = require("express");
const cors = require("cors");

// Rotas
const contactRoutes = require("./routes/contact");
const notificationRoutes = require("./routes/notifications");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usar rotas
app.use("/api/contact", contactRoutes);
app.use("/api/notifications", notificationRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});