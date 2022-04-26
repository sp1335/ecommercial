const express = require('express')
const app = express()
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")

const dotenv = require('dotenv')
dotenv.config()
const enve = process.env

const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")

mongoose.connect(enve.MONGO_URL)
    .then(() => {
        console.info('DB connected succesfully')
    })
    .catch((err) => {
        console.warn("DB connection problem;\n " + err)
    })

app.use(express.json());
app.use('/users', userRoute)
app.use('/auth', authRoute)
app.use('/product', productRoute)

app.listen(enve.PORT, () => {
    console.log("Server is running!")
})