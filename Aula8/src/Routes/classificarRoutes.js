const router = require("express").Router();
const classificarController = require("../Controllers/classificarControllers");

router.get("/", classificarController.classificar);
router.post("/", classificarController.classificar);

module.exports = router;