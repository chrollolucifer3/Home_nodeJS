const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/public/img')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const ext = file.originalname.split('.').slice(-1);
      const filename = file.fieldname + '-' + uniqueSuffix + '.' + ext;
      req.filename = filename;
      cb(null, filename)
    }
  })
  
  const upload = multer({ storage: storage });

  module.exports = upload;