const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');


router.post('/',UserController.signUp);

module.exports = router;