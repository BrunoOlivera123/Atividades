const router = require("express").Router();
const loginController = require("../Controllers/LoginControllers");


router.get('/', loginController.validacaologin);
router.post('/', loginController.validacaologin);

module.exports = router;