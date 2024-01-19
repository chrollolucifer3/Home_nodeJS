const jwt = require('jsonwebtoken');
const config = require('../configs/config');
const User = require('../models/User');

const tokenParser = async (req, res, next) => {
    if (req.cookies && req.cookies.token) {
        try {
            //giải mã token
            const payload = jwt.verify(req.cookies.token, config.secretKey); 
            req.username = payload.username;
            req.role = payload.role;
            
            const user = await User.findOne({ username: req.username });
            req.avatar = user.avatar;

            // Cập nhật avatar trong cookie
            setAvatarCookie(res, req.avatar);
        } catch (error) {
            console.log(error);
        }
    }

    next();
};

//sử dụng để cập nhật cookie avatar mỗi khi phản hồi
const setAvatarCookie = (res, avatar) => {
    res.cookie('avatar', avatar);
};

module.exports = tokenParser;
