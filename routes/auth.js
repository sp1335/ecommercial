const router = require('express').Router();
const User = require('../modules/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

router.post('/register', async(req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_PHRASE).toString(),
    })
    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json(err)
    }
})
router.post('/login', async(req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user &&
            res.status(401).json("No such user")
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_PHRASE)
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        OriginalPassword !== req.body.password &&
            res.status(401).json("Wrong password, asshole!")
        const accessToken = jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC, { expiresIn: "3d" }
        )
        const { password, ...other } = user._doc;
        res.status(200).json({ other, accessToken })
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router