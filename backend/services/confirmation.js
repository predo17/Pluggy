const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "confirmation.json");

function saveConfirmation(data) {
  let existing = [];

  try {
    existing = JSON.parse(fs.readFileSync(filePath, "utf8") || "[]");
  } catch {
    existing = [];
  }

  existing.push(data);
  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

  return data;
}

module.exports = { saveConfirmation };
