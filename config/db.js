const mongoose = require('mongoose')
require('dotenv').config()

 const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            tls: true,
            tlsAllowInvalidCertificates: true,
        })
        console.log("DataBase successFully connected")
    } catch (error) {
        console.log("mongoDB not connected ",error.message)
    }
}
module.exports = connectDB