const mongoose = require('mongoose')
require('dotenv').config()

 const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI )
        console.log("DataBase successFully connected")
    } catch (error) {
        console.log("mongoDB not connected ",error.message)
    }
}
module.exports = connectDB