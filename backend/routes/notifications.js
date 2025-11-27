const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.get("/", (req, res) => {
    const filePath = path.join(__dirname, "..", "notifications.json");

    if (!fs.existsSync(filePath)) {
        return res.json([]);
    }

    const notifications = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return res.json(notifications);
});

module.exports = router;
