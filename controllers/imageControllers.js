const Image = require('../models/imageSchema')
const uploadImageFile = require('../Helper/uploadImageCloudinary')
const getAllImage = async(req,res) => {
    try {
        const getImage = await Image.find({})

        return res.status(200).json({
            success:true,
            image : getImage
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Internal server error"
        })
    }
}


const UploadImage = async(req,res) => {

}
module.exports = {getAllImage}