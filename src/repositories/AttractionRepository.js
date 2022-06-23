const PrismaClient = require('../database/PrismaClient');

class AttractionRepository {
    async save(_attraction) {
        const attraction = await PrismaClient.attraction.create({
            data: _attraction
        })

        return attraction;
    }

    async findByCode(code) {
        const attraction = await PrismaClient.attraction.findUnique({
            where: {
                code
            }
        })

        return attraction;
    }

    async findByName(name) {
        const attraction = await PrismaClient.attraction.findUnique({
            where: {
                name
            }
        })

        return attraction;
    }

    async findById(id) {
        const attraction = await PrismaClient.attraction.findUnique({
            where: {
                id
            }
        })

        return attraction;
    }

    async count(id_attraction){
        const amount = await PrismaClient.userAttraction.findMany({
            where:{
                id_attraction
            }
        });

        return amount;
    }

    async checkIn( idAttraction, idUser, position){
        const queue = await PrismaClient.userAttraction.create({
            data: {
                id_attraction: idAttraction,
                id_user: idUser,
                position
            }
        })

        return queue;
    }
}

module.exports = new AttractionRepository();