const express = require("express");
const router = express.Router();
const { signUp, signIn, logout, isAuthenticated } = require("../controllers/auth");

router.post("/signup", signUp);
router.post("/login", signIn);
router.post("/logout", logout);
router.get("/isauth", isAuthenticated);
module.exports = router;
