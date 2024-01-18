const authorize = (role) => {
    return (req, res, next) => {
        if(req.role === role) {
            next();
        } else {
            res.render('login', {
                errMessage: `You must login with ${role} account to access ${req.originalUrl}`,
                url: req.originalUrl
            })
        }
    }
}

module.exports = authorize;
