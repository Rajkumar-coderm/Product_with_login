const { generateAccessToken, authenticateToken } = require('../Auth/auth.jwt')
const express = require('express')
const Routs = express.Router()
const bodyParser = require('body-parser')
const encoded = bodyParser.urlencoded({ extended: true })
const { addProduct, getProduct, updateProduct, removeProduct } = require('../controller/product.controller')

Routs.get('/getProduct', getProduct)
Routs.post('/addProduct', authenticateToken, addProduct)
Routs.put('/updateProduct', authenticateToken, updateProduct)
Routs.delete('/removeProduct/:id', authenticateToken, removeProduct)

module.exports = Routs;