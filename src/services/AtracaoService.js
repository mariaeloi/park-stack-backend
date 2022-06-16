const AtracaoRepository = require('../repositories/AtracaoRepository');
const { responseCreated, responseBadRequest, responseOk } = require('../utils/response');
const msg = require('../constants/messages');

class AtracaoService {
    async save(atracao) {
        let errors = new Object();

        const atracaoPorCodigo = await AtracaoRepository.findByCodigo(atracao.codigo);
        if(atracaoPorCodigo) {
            errors.codigo = msg.atracao.codigoRepetido;
        }
        const atracaoPorNome = await AtracaoRepository.findByNome(atracao.nome);
        if(atracaoPorNome) {
            errors.nome = msg.atracao.nomeRepetido;
        }

        if(Object.keys(errors).length !== 0) {
            return responseBadRequest(msg.atracao.cadastroError, errors);
        }
        
        const atracaoSalva = await AtracaoRepository.save(atracao);
        return responseCreated(atracaoSalva, msg.atracao.cadastroOk);
    }

    async findById(id) {
        const atracao = await AtracaoRepository.findById(id);

        if(!atracao) {
            return responseBadRequest(msg.atracao.buscaError);
        }

        return responseOk(atracao);
    }
}

module.exports = new AtracaoService();