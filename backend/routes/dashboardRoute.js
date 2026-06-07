const express = require("express");
const { getDashboardStats } = require("../controllers/dashboardController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.get("/stats", requireAuth, getDashboardStats);

module.exports = router;