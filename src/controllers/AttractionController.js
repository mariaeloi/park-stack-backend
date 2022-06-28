const AttractionService = require('../services/AttractionService');

class AttractionController {
    async save(req, res, next) {
        try {
            const response = await AttractionService.save(req.body);
            res.json(response);
        } catch(err) {
            next(err);
        }
    }

    async findById(req, res, next) {
        try {
            const { id } = req.params;
            const response = await AttractionService.findById(parseInt(id));
            res.json(response);
        } catch(err) {
            next(err);
        }
    }

    async checkIn(req, res, next){
        try {
            const response = await AttractionService.checkIn(req.body);
            res.json(response);
        } catch(err) {
            next(err);
        }
    }

    async findAll(req, res, next) {
        try {
            const response = await AttractionService.findAll();
            res.json(response);
        } catch(err) {
            next(err);
        }
    }
}

module.exports = new AttractionController();