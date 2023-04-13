const express = require("express");
const router = express.Router();
const humanController = require("../controllers/humanController");
const basicAuth = require("../middleware/basicAuth");

router.get("/", humanController.index);
router.post("/", basicAuth, humanController.create);
router.get("/new", humanController.new);
router.get("/:id", humanController.show);
router.get("/:id/edit", humanController.edit);
router.put("/:id", basicAuth, humanController.update);
router.delete("/:id", basicAuth, humanController.delete);

module.exports = router;
