const Apartment = require('../models/Apartment');
const render = require('../utils/render');

class ApartmentController {

    getCreate = async (req, res, next) => {
        render(req, res, 'createHome');
    }

    store = async (req, res, next) => {
        try {
            req.body.cover = req.filename;
            await Apartment.create(req.body);
            res.redirect('/');
        } catch (error) {
            console.log(error);
        }
    }

    delete = async (req, res, next) => {
        try {
            await Apartment.findByIdAndDelete(req.params.id);
            res.redirect('/');
        } catch (error) {
            console.log(error);
        }
    }

    get = async (req, res, next) => {
        try {
            const apartment = await Apartment.findById({_id: req.params.id})
            render(req, res, 'updateHome', {apartment});
        } catch (error) {
            console.log(error);
        }
    }

    update = async( req, res, next ) => {
        try {
            const formData = req.body;
            const fileName = req.file.filename;
            await Apartment.updateOne({_id: req.params.id}, { ...formData, cover: fileName }); //speard operator
            res.redirect('/')
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new ApartmentController