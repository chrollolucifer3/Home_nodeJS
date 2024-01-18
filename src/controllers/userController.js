const User = require('../models/User');
const crypto = require('crypto');
const config = require('../configs/config');
const jwt = require('jsonwebtoken');
const render = require('../utils/render');

class UserController {

    getLogin = async (req, res, next) => {
        res.render('login')
    }

    getCreate = async (req, res, next) => {
        render(req, res, 'create-user');
    }

    CreateUser = async (req, res, next) => {
        try {

            const existingUser = await User.findOne({ username: req.body.username });
            if(existingUser) {
                return render(req, res, 'create-user', { errMessage: 'Username đã tồn tại!' } );
            }
            const salt = await crypto.randomBytes(16).toString('hex');
            const hmac = crypto.createHmac('sha256', salt);
            const hashedPassword = hmac.update(req.body.password).digest('hex');

            await User.create({
                username: req.body.username,
                password : hashedPassword,
                salt: salt,
                role: req.body.role,
                avatar: req.filename
            });
            res.redirect('/');
        } catch (error) {
            console.log(error);
        }
    }

    login = async (req, res, next) => {
        try {
            if (req.body && req.body.username && req.body.password) {
                const dbUser = await User.findOne({ username: req.body.username });
                if (dbUser) {
                    const hmac = crypto.createHmac('sha256', dbUser.salt);
                    const hashedPassword = hmac.update(req.body.password).digest('hex');
    
                    if (hashedPassword === dbUser.password) { 
                        const token = jwt.sign({ username: dbUser.username, role: dbUser.role, avatar: dbUser.avatar }, config.secretKey);
                        res.cookie('token', token);
                        if(req.body.url) {
                            res.redirect(req.body.url);
                        } else res.redirect('/');
                    } else {
                        render(req, res, 'login', { errMessage: `Sai mật khẩu` })
                    }
                } else {
                    render(req, res, 'login', { errMessage: `${req.body.username} Tài khoản không tồn tại` })
                }
            } else {
                render(req, res, 'login', { errMessage: 'Bạn phải nhập username và password' })
            }
        } catch (error) {
            console.log(error);
        }
    };

    logOut = async (req, res, next) => {
        res.clearCookie('token');
        res.redirect('/');
    }

    getChangePass = async (req, res, next) => {
        render(req, res, 'change-password');
    }

    updatePass = async (req, res, next) => {
        try {
            const {currentPassword, newPassword, confirmNewPassword  } = req.body;
            const dbUser = await User.findOne({username: req.username});
            
            const hmac = crypto.createHmac('sha256', dbUser.salt);
            const hashPassword = hmac.update(currentPassword).digest('hex');

            if(hashPassword !==  dbUser.password) {
                return render(req, res, 'change-password', { errMessage: 'Mật khẩu hiện tại không đúng' } );
            };

            if(newPassword !== confirmNewPassword) {
                return render(req, res, 'change-password', { errMessage: 'Mật khẩu mới và mật khẩu nhập lại không khớp.' });
            }

            const newSalt = crypto.randomBytes(16).toString('hex');
            const newHmac = crypto.createHmac('sha256', newSalt);
            const hashedPassword = newHmac.update(newPassword).digest('hex');

            await User.findByIdAndUpdate(dbUser._id, {
                salt: newSalt,
                password: hashedPassword,
            });

            res.clearCookie('token');
            res.render('login')
        } catch (error) {
            console.error(error);
        }
    }

    getChangeAvatar = async (req, res, next) => {
        render(req, res, 'change-avatar');
    }

    updateAvatar = async (req, res, next) => {
        try {
            const user = await User.findOne({username: req.username});
            user.avatar = req.filename;
            await user.save();
            res.redirect('/');
        } catch (error) {
            console.error(error);
        }
    }

}

module.exports = new UserController();