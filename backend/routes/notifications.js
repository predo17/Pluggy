const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.get("/", (req, res) => {
    const filePath = path.join(__dirname, "..", "notifications.json");

    if (!fs.existsSync(filePath)) {
        return res.json([]);
    }

    const notifications = JSON.parse(fs.readFileSync(filePath, "utf8" ));
    return res.json(notifications);
});

router.delete("/:id", (req, res) => {
    const filePath = path.join(__dirname, "..", "notifications.json");

    const notifications = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const newList = notifications.filter(n => n.id !== Number(req.params.id));

    fs.writeFileSync(filePath, JSON.stringify(newList, null, 2));

    return res.json({ success: true });
});


module.exports = router;
