const express = require('express')
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  res.send('hello world')
})

router.get('/coffee-cup', (req, res) => {
  res.sendFile(path.join(process.cwd()+'/src/view/coffee-cup.html'));
})

const logicTest = require('./logic-test.route')
router.use('/logic-test',logicTest)

const refactore = require('./refactore.route')
router.use('/refactore',refactore)

module.exports = router;