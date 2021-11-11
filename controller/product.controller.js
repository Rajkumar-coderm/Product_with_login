const express = require('express')
const app = express()
app.use(express.json())
const multer = require('multer')
const db = require('../models/product.models')
const fs = require('fs')
const path = require('path')


const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'uploads/product')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

exports.getProduct = async((req, res) => {
    let data = await db.find()
    res.status(200).json({ data: data })
})

exports.addProduct = upload.array('productImage', 12), async((req, res) => {
    try {
        let { productName, productType, size, Quantity, productColor } = req.body
        const img = fs.readFileSync(req.file.path);
        const encode_img = img.toString('base64');
        const productImage = {
            contentTyepe: req.file.mimetype,
            path: req.file.path,
            image: new Buffer(encode_img, 'base64')
        };
        const userdata = {
            productName: productName,
            productType: productType,
            size: size,
            Quantity: Quantity,
            productColor: productColor,
            productImage: productImage.path
        }
        await db.insertMany(userdata)
            .then((result) => {
                res.status(200).send({ message: "Product add succeesfully.." })
            }).catch((err) => {
                res.status(500).send({ message: err })
            });
    } catch (error) {
        console.log(error.message);
    }
})

exports.updateProduct = async((req, res) => {
    try {
        const data = await db.find({ email: req.data.Email })
        console.log(data);
        const userData = {
            productName: req.body.productName,
            productType: req.body.productType,
            size: req.body.size,
            Quantity: req.body.Quantity,
            productColor: req.body.productColor
        }
        await db.findByIdAndUpdate({ _id: data[0]._id },
            {
                $set: userData,
            })
            .then((result) => {
                res.status(200).send({ message: "successfull upaded in databases.." })
            }).catch((err) => {
                res.status(500).send({ message: err.message })
            });
    } catch (error) {
        console.log(error.message);
    }
})

exports.removeProduct = async((req, res) => {
    try {
        db.findByIdAndDelete(req.params.id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    } catch (error) {
        console.log(error.message);
    }
})

