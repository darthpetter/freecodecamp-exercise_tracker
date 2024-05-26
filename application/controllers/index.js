const mainController = require('./main.controller');
const express = require('express');

const router = express.Router();

router.use(mainController);

module.exports=router