const express = require("express");
const router = express.Router();
const { sendMessage, sendFileMessage, getMessages } = require("../controllers/message");

router.post("/send", sendMessage);
router.post("/send/file", sendFileMessage);
router.get("/:id", getMessages);
module.exports = router;
