const express = require('express')
const bcrypt = require('bcrypt')
const { generateAccessToken, authenticateToken } = require('../Auth/auth.jwt')
const bodyParser = require('body-parser')
const encoded = bodyParser.urlencoded({extended:true})
const multer = require('multer')
const db = require('../models/user.models')
const fs = require('fs')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

exports.signup =upload.single('image'), async (req, res) => {
    console.log(req.body);
    try {
        const img = fs.readFileSync(req.file.path);
        const encode_img = img.toString('base64');
        const profileImage = {
            contentTyepe: req.file.mimetype,
            path: req.file.path,
            image: new Buffer(encode_img, 'base64')
        };
        const { fullName, email, password } = req.body
        // console.log(profileImage);
        const userdata = {
            fullName: fullName,
            email: email,
            password: bcrypt.hashSync(password, 10),
            image: profileImage.path
        }
        await db.insertMany(userdata)
            .then((result) => {
                res.status(200).send({ message: "Register successfully" })
            }).catch((err) => {
                res.status(500).send({ message: err })
            });
    } catch (error) {
        console.log({ msg: error.message });
    }
}


exports.login=async (req, res) => {
    try {
        const data = await db.find({ email: req.body.email })
        console.log(data[0].email);
        if (data[0].email) {
            console.log(req.body.email);
            if (data[0].email == req.body.email) {
                if (bcrypt.compareSync(req.body.password, data[0].password)) {
                    const token = generateAccessToken({ Email: req.body.email })
                    res.cookie("token", token).status(200).send({ message: "login successfully " })
                } else {
                    res.status(404).send({ message: "incorrect Password" })
                }
            } else {
                res.status(404).send({ message: "incorrect Email..." })
            }
        } else {
            res.send("not valid")
        }
    } catch (error) {
        console.log({ msg: error.message });
    }
}