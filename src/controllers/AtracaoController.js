const AtracaoService = require('../services/AtracaoService');

class AtracaoController {
    async save(req, res, next) {
        try {
            const response = await AtracaoService.save(req.body);
            res.json(response);
        } catch(err) {
            next(err);
        }
    }

    async findById(req, res, next) {
        try {
            const { id } = req.params;
            const response = await AtracaoService.findById(parseInt(id));
            res.json(response);
        } catch(err) {
            next(err);
        }
    }
}

module.exports = new AtracaoController();