const express = require("express");
const router = express.Router();

const { updateBusinessProfile } = require("../controllers/user");

router.post("/update", updateBusinessProfile);
module.exports = router;
