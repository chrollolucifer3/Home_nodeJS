const express = require('express');
const router = express.Router();
const apartmentController = require('../controllers/apartmentController');
const upload = require('../middlewares/multer');
const auth = require('../middlewares/auth');

router.get('/create-apartment', auth, apartmentController.getCreate);
router.post('/store-apartment', auth, upload.single('cover'), apartmentController.store);
router.get('/delete-apartment/:id',auth, apartmentController.delete);
router.get('/update-apartment/:id', auth, apartmentController.get);
router.post('/update-apartment/:id', auth, upload.single('cover'), apartmentController.update);

module.exports = router;