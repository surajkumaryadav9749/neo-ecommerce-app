const express = require("express");
const router = express.Router();
const {
  registerUser,
  userLogin,
  getProfile,
} = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

//register route
router.post("/register", registerUser);

//login route
router.post("/login", userLogin);
router.get("/profile", authMiddleware, getProfile);
module.exports = router;
