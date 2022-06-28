const AttractionRepository = require('../repositories/AttractionRepository');
const { responseCreated, responseBadRequest, responseOk } = require('../utils/response');
const msg = require('../constants/messages');

class AttractionService {
    async save(attraction) {
        let errors = new Object();

        attraction.code = `#${attraction.name.toUpperCase().replaceAll(' ', '_')}`;
        attraction.num_users = parseInt(attraction.num_users);

        const attractionByName = await AttractionRepository.findByName(attraction.name);
        if(attractionByName) {
            errors.name = msg.attraction.nameExists;
        }

        if(attraction.duration <= 0) {
            errors.duration = "A duração deve ser maior que 0";
        }

        if(attraction.num_users <= 0) {
            errors.num_users = "A quantidade de vagas deve ser maior que 0";
        }

        if(Object.keys(errors).length !== 0) {
            return responseBadRequest(msg.attraction.createError, errors);
        }
        
        const attractionReturn = await AttractionRepository.save(attraction);
        return responseCreated(attractionReturn, msg.attraction.createOk);
    }

    async findById(id) {
        const attraction = await AttractionRepository.findById(id);

        if(!attraction) {
            return responseBadRequest(msg.attraction.searchError);
        }

        return responseOk(attraction);
    }

    async checkIn(pQueue) {

        const attraction = await AttractionRepository.findById(parseInt(pQueue.idAttraction));

        if(!attraction) {
            return responseBadRequest(msg.attraction.searchError);
        }
 
        const queue = await AttractionRepository.count(parseInt(pQueue.idAttraction));

        let position = queue.length;

        const attractionCheckinReturn = await AttractionRepository.checkIn(parseInt(pQueue.idAttraction), parseInt(pQueue.idUser), parseInt(position+1));
        
        return responseCreated(attractionCheckinReturn, msg.attraction.checkIn);
    }

    async findAll() {
        const attractions = await AttractionRepository.findAll();
        return responseOk(attractions);
    }
}

module.exports = new AttractionService();