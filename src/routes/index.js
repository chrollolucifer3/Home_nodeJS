const apartmentRouter = require('./apartmentRouter')
const siteRouter = require('./siteRouter');
const userRouter = require('./userRouter');

function route(app) {
    app.use('/', siteRouter);
    app.use('/', apartmentRouter);
    app.use('/', userRouter);
}

module.exports = route;