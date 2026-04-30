const express = require('express');
const router = express.Router();
const loginController = require('../Controllers/LoginControllers');

router.get('/',loginController.LoginUsuario);

module.exports = router;