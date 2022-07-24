const express = require('express')
const router = express.Router();

const logicTest = require('./../controllers/logic-test.controller')

router.get('/', logicTest.generate)

module.exports = router;