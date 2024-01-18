const auth = (req, res, next)=> {
    if(req.username) {
        next();
    } else {
        res.render('login', {
            errMessage: `You must login to access url ${req.originalUrl}`, 
            url : req.originalUrl
        });
    }
}

module.exports = auth;