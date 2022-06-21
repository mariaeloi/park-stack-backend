const AttractionRepository = require('../repositories/AttractionRepository');
const { responseCreated, responseBadRequest, responseOk } = require('../utils/response');
const msg = require('../constants/messages');

class AttractionService {
    async save(attraction) {
        let errors = new Object();

        const attractionByCode = await AttractionRepository.findByCode(attraction.code);
        if(attractionByCode) {
            errors.code = msg.atracao.codigoRepetido;
        }
        const attractionByName = await AttractionRepository.findByName(attraction.name);
        if(attractionByName) {
            errors.name = msg.atracao.nomeRepetido;
        }

        if(Object.keys(errors).length !== 0) {
            return responseBadRequest(msg.atracao.cadastroError, errors);
        }
        
        const attractionReturn = await AttractionRepository.save(attraction);
        return responseCreated(attractionReturn, msg.atracao.cadastroOk);
    }

    async findById(id) {
        const attraction = await AttractionRepository.findById(id);

        if(!attraction) {
            return responseBadRequest(msg.atracao.buscaError);
        }

        return responseOk(attraction);
    }
}

module.exports = new AttractionService();