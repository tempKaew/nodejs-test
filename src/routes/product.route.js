const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

const Product = require('./../controllers/product.controller')
router.get('/', Product.productList)
router.get('/:id', Product.productView)
router.put('/:id', jsonParser, Product.productUpdate)
router.post('/create', jsonParser, Product.productCreate)

module.exports = router