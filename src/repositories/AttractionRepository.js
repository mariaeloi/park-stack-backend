const PrismaClient = require('../database/PrismaClient');

class AttractionRepository {
    async save(_atracao) {
        const atracao = await PrismaClient.atracao.create({
            data: _atracao
        })

        return atracao;
    }

    async findByCodigo(codigo) {
        const atracao = await PrismaClient.atracao.findUnique({
            where: {
                codigo
            }
        })

        return atracao;
    }

    async findByNome(nome) {
        const atracao = await PrismaClient.atracao.findUnique({
            where: {
                nome
            }
        })

        return atracao;
    }

    async findById(id) {
        const atracao = await PrismaClient.atracao.findUnique({
            where: {
                id
            }
        })

        return atracao;
    }
}

module.exports = new AttractionRepository();