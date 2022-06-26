const express = require("express");
const router = express.Router();

const { signUp } = require("../controllers/auth");

//TODO: user validator middleware
router.post("/signup", signUp);

module.exports = router;
