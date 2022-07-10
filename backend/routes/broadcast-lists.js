const express = require("express");
const router = express.Router({ mergeParams: true });
const { sendBroadCast } = require("../controllers/broadcast");

const broadcast_list_controller = require("../controllers/broadcastlistController");

router.post("/send", sendBroadCast);
router.get("/all", broadcast_list_controller.braodcast_list);
router.get("/search/:id", broadcast_list_controller.search_broadcast_list);
router.post("/create", broadcast_list_controller.create_broadcast);
router.put("/update/:id", broadcast_list_controller.update_broadcast);
router.delete("/delete/:id", broadcast_list_controller.delete_broadcast_list);

module.exports = router;
