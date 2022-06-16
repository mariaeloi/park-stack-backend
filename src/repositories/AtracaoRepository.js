const PrismaClient = require('../database/PrismaClient');

class AtracaoRepository {
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
}

module.exports = new AtracaoRepository();