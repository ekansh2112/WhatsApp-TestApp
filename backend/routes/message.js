const express = require("express");
const router = express.Router();

const { sendMessage, sendFileMessage } = require("../controllers/message");

router.post("/send", sendMessage);
router.post("/send/file", sendFileMessage);
module.exports = router;
