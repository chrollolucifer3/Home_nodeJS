module.exports = (req, res, view, data) => {
    res.render(view, {...data, username: req.username, role: req.role, userAvatar: req.avatar}); //spread operator
}
