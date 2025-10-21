const User = require('../models/userSchema')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const userRegister = async (req , res) => {
    const {username,email,password,role} = req.body
     try {
        const isExists = await User.findOne({email})

        if(isExists) {
            return res.json({
                message:'user already exists please register another email'
            })
        }

        const hashPassword = await argon2.hash(password)

        const newUser = new User({
            username,
            email,
            password : hashPassword,
            role : role || 'user'
        })

        await newUser.save()

        return res.status(201).json({
            success : true,
            message : 'register successfully ..'
        })
     } catch (error) {
        res.status(500).json({
            success:false,
            message : `Internal server error : ${error.message}`
        })
     }
}

module.exports = {userRegister}