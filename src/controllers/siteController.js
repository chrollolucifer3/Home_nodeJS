const Apartment= require('../models/Apartment');
const render = require('../utils/render');

class SiteController {
    get = async (req, res, next) => {
        try {
            const apartments = await Apartment.find({});
            render(req, res, 'site', {apartments});
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new SiteController();