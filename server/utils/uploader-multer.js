const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

//middleware for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './server/uploads');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      //unique file name for each image
      uuidv4() + path.extname(file.originalname)
    );
  },
});

const uploader = multer({
  storage: storage,
  limits: { fileSize: 100000000 }, //100mb
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      return cb(null, true);
    }

    const fileTypes = /jpeg|JPEG|jpg|JPG|png|PNG/; //allowed file types
    const mimeType = fileTypes.test(file.mimetype); //check file type
    const extname = fileTypes.test(path.extname(file.originalname)); //check extension
    //check mime and extension
    if (mimeType && extname) {
      return cb(null, true);
    }

    cb('Error: Images Only!');
  },
});

module.exports = uploader;
