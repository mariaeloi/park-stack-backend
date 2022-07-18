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

    async findAll() {
        const attractions = await PrismaClient.attraction.findMany();
        return attractions;
    }

    async findUserPosition(id_user){
        const userAttraction = await PrismaClient.userAttraction.findUnique({
            where: {
                id_user
            }
        })
        return userAttraction;
    }

    async checkout(idUser){
        await PrismaClient.userAttraction.delete({
            where: {
                id_user: idUser
            }
        })
    }

    async updatePositionsGT(position, id_attraction){
        await PrismaClient.userAttraction.updateMany({
            where: {
                id_attraction,
                position: {
                    gt: position
                }
            },
            data: {
                position: {
                    decrement: 1
                }
            }
        })
    }
}

module.exports = new AttractionRepository();