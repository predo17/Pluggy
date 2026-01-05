const express = require("express");
const { confirmPurchase } = require("../controller/purchase");

const router = express.Router();
router.post("/confirm-purchase", confirmPurchase);

module.exports = router;
