const User = require('../modules/User');
const { route } = require('./auth');
const { verifyTokenAndAuth, verifyTokenAndAdmin } = require('./verifyToken');

const router = require('express').Router();

//update
router.put('/:id', verifyTokenAndAdmin, async(req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_PHRASE).toString();
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(500).json(err)
    }
})

//delete
router.delete("/:id", verifyTokenAndAuth, async(req, res) => {
    console.log('Delete')
    try {
        await User.findByIdAndDelete(req.param.id)
        res.status(200).json("User has been deleted")
    } catch (err) {
        return res.status(500).json(err)
    }
})

//get
router.get("/find/:id", verifyTokenAndAdmin, async(req, res) => {
    try {
        const requiredUser = await User.findById(req.params.id)
        const { password, ...other } = requiredUser._doc;
        res.status(200).json(other)
    } catch (err) {
        return res.status(500).json(err)
    }
})

//get all users
router.get("/", verifyTokenAndAdmin, async(req, res) => {
    const query = req.query.new
    try {
        const users = query ?
            await User.find().sort({ _id: -1 }).limit(3) :
            await User.find();
        res.status(200).json(users);
    } catch (err) {
        return res.status(500).json(err)
    }
})

//get user stats   1:22:16 
router.get("/stats", verifyTokenAndAdmin, async(req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([{
                $match: {
                    createdAt: {
                        $gte: lastYear
                    }
                }
            },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        console.log
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router