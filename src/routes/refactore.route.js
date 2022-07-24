const express = require('express')
const router = express.Router();

const refactore = require('./../controllers/refactore.controller')

router.get('/', refactore.getToDoList)

module.exports = router;