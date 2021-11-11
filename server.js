const express = require('express')
const app = express()
app.use(express.json())
require('dotenv').config()
const PORT = process.env.PORT

app.use('/user', require('./Routs/user.routs'))
app.use('/product', require('./Routs/product.routs'))

app.use("*", (req, res) => {
    res.status(404).json({
        status: 404,
        message: "Page Not Found"
    })
})
app.listen(PORT, () => {
    console.log(`server Running at ${PORT} `);
})