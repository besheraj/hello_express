const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Auth = require('../models/Auth')
const { registerValidation, loginValidation } = require('./validation')


router.post('/register', async (req, res) => {

    // Validate
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send({ Error: error.details[0].message })

    // Email exists
    const emailExists = await Auth.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send({ Error: 'Email Already Exists' })

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    // Create New User
    const user = new Auth({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
    })
    try {
        const savedUser = await user.save();
        res.send(savedUser)
    } catch (err) {
        res.status(400).send(err)
    }

})

// Login
router.post('/login', async (req, res) => {

    // Validate
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send({ Error: error.details[0].message })

    // Email exists
    const user = await Auth.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ Error: 'Email or Password dosent match' })

    // If Password & Email is a match
    const validatePass = await bcrypt.compare(req.body.password, user.password)
    if (!validatePass) return res.status(400).send({ Error: 'Email or Password dosent match' })

    // Create Token 
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '2h' })
    // res.header({token}).send({message: 'login Successful'})
    const decoded = jwt.decode(token)
    console.log(decoded)
    res.send({
        'access_token': token,
        'expiresIn': decoded.exp,
    })

})
module.exports = router;