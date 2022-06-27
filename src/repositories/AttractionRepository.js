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

    async findAll() {
        const attractions = await PrismaClient.attraction.findMany();
        return attractions;
    }
}

module.exports = new AttractionRepository();