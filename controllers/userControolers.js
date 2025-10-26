require('dotenv').config()
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

const userLogin = async (req,res) => {
    const {email,password} = req.body
    try {
        const isUser = await User.findOne({email})

        if(!isUser) {
            return res.status(404).json({
                success:false,
                message: 'user not register'
            })
        }

        const isPassword = await argon2.verify(isUser.password , password)

        if(!isPassword) {
            return res.status(401).json({
                success:false,
                message:'Password or email wrong'
            })
        }

        const accessToken = jwt.sign({
            userId : isUser._id,
            useRole : isUser.role
        }, process.env.JWT_PRIVATE_KEY ,{
            expiresIn : '1d'
        })

        res.cookie(accessToken)

        return res.status(200).json({
            success:true,
            message : 'user login successfully'
        })
    } catch (error) {
         res.status(500).json({
            success:false,
            message : `Internal server error : ${error.message}`
        })
    }
}

   
module.exports = {userRegister,userLogin}