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
}

module.exports = new AtracaoController();