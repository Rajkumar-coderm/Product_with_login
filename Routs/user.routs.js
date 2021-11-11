const express=require('express')
const Routs=express.Router()
const bodyParser = require('body-parser')
const encoded = bodyParser.urlencoded({extended:true})
// const { generateAccessToken, authenticateToken } = require('../Auth/auth.jwt')

const controller=require('../controller/user.controller')

Routs.get('/',encoded,(req,res)=>{
    res.send(req.body)
})
Routs.post('/login',controller.login)
Routs.post('/signup',controller.signup)

module.exports=Routs;