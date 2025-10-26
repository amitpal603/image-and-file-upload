const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req,res,cd) {
        cd(null,'uploads/')
    },
    filename : function (req,file,cd) {
        cd(null,
            file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        )
    }
})

const CheckFilter = (req,file,cd) => {
    if(['image/jpeg','image/png','image/jpg'].includes(file.mimetype.startWith('image'))){
        cd(null,true)
    }
    else {
         cd(new Error('Not an image! please upload only images'))
    }
}

module.exports = multer({
    storage :storage,
    fileFilter : CheckFilter,
    limits : {
        fieldSize: 9* 1024 * 1024
    }
})