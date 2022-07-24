const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.send('hello world')
})

const logicTest = require('./logic-test.route')
router.use('/logic-test',logicTest)

module.exports = router;