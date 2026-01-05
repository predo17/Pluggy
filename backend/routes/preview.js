const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Função auxiliar segura para ler JSON
function safeRead(pathFile) {
    try {
        if (!fs.existsSync(pathFile)) return [];
        return JSON.parse(fs.readFileSync(pathFile, "utf8"));
    } catch (err) {
        console.error("Erro ao ler:", pathFile, err);
        return [];
    }
}
// Função segura para escrever JSON
function safeWrite(pathFile, data) {
    fs.writeFileSync(pathFile, JSON.stringify(data, null, 2), "utf8");
}

router.get("/", (req, res) => {
    const confirmationPath = path.join(__dirname, "..", "confirmation.json");
    const confirmation = safeRead(confirmationPath);

    return res.json({confirmation});

});

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    const confirmationPath = path.join(__dirname, "..", "confirmation.json");
    const confirmation = safeRead(confirmationPath);

    const newConfirmation = confirmation.filter(item => item.id !== id);

    safeWrite(confirmationPath, newConfirmation);
    
    return res.json({ success: true });
});

module.exports = router;
