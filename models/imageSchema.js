const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    url : {
        type:String,
        require: true
    },
    publicId: {
        type:String,
        require: true
    },
    uploadedBy: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
} , {timestamps:true})

const Image = mongoose.model('Image',imageSchema)
module.exports = Image