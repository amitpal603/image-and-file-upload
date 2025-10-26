const jwt = require('jsonwebtoken')
require('dotenv')

const userAuth = (req,res,next) => {
  const authHeader = req.headers['authorization']

  if(!authHeader){
    return res.status(403).json({
        success:false,
        message:'did not provide authorization token please token .. ?'
    })
  }

  const token = authHeader && authHeader.split(" ")[1]

  if(!token){
    return res.status(403).json({
        success : false,
        message : 'user not login please login'
    })
  }

  try {
    const decodeInfo = jwt.verify(token,process.env.JWT_PRIVATE_KEY)
    console.log(decodeInfo)

    req.userInfo = decodeInfo
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token, please login again",
    });
  }
}

module.exports = userAuth