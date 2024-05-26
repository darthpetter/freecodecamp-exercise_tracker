const userController = require('./user.controller');
const express = require('express');

const router = express.Router();

router.use(userController);

module.exports=router