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
            errors.duration = msg.attraction.invalidDuration;
        }

        if(attraction.num_users <= 0) {
            errors.num_users = msg.attraction.invalidNumUsers;
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

        const queue = await AttractionRepository.count(parseInt(id));

        let queueSize = queue.length;
        attraction.queueSize = queueSize;
        return responseOk(attraction);
    }

    async checkIn(pQueue) {

        const attraction = await AttractionRepository.findById(parseInt(pQueue.idAttraction));

        if(!attraction) {
            return responseBadRequest(msg.attraction.searchError);
        }

        const isInQueue = await AttractionRepository.findUserPosition(parseInt(pQueue.idUser));

        if(isInQueue){
            return responseBadRequest(msg.user.alreadyInQueue);
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

    async getUserPosition(idUser) {
        const userAttraction = await AttractionRepository.findUserPosition(parseInt(idUser));
        if(userAttraction == null) {
            return responseBadRequest(msg.user.notFoundInQueue);
        }
        const attraction = await AttractionRepository.findById(parseInt(userAttraction.id_attraction));
        userAttraction.id_attraction = attraction;
        return responseOk(userAttraction);
    }

    async checkOut(body) {
        const userAttraction = await AttractionRepository.findUserPosition(parseInt(body.idUser));
        if(userAttraction == null) {
            return responseBadRequest(msg.user.notFoundInQueue);
        }

        await AttractionRepository.checkout(parseInt(userAttraction.id_user));
        await AttractionRepository.updatePositionsGT(userAttraction.position, userAttraction.id_attraction);
        return responseOk({}, msg.attraction.checkOut);
    }
}

module.exports = new AttractionService();