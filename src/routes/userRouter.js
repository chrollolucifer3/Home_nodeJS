const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middlewares/multer');
const authorize = require('../middlewares/authorize');
const auth = require('../middlewares/auth');

router.post('/login', userController.login);
router.get('/login', userController.getLogin);
router.post('/create-user', authorize('admin'), upload.single('avatar'), userController.CreateUser);
router.get('/create-user', authorize('admin'), userController.getCreate);
router.get('/logout', userController.logOut);
router.post('/update-password', auth, userController.updatePass);
router.get('/change-password', auth, userController.getChangePass);
router.post('/update-avatar', auth, upload.single('avatar'), userController.updateAvatar);
router.get('/change-avatar', auth, userController.getChangeAvatar);

module.exports = router;