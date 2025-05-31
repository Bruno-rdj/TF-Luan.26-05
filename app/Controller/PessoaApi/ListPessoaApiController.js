import PessoaModel from "../../Models/PessoaModel.js";
import TelefoneModel from "../../Models/TelefoneModel.js";
import CONSTANTS from "../../../config/constants.js";

export default async (request, response) => {

    const HTTP_STATUS = CONSTANTS.HTTP;

    const ORDENACAO_PADRAO = ["id", "asc"];

    const ORDENCAO_CAMPOS_PERMITIDOS = ["id", "created_at", "updated_at"];

    const ORDENCAO_DIRECAO_PERMITIDOS = ["ASC", "DESC"];

    try {
        // Parâmetros de paginação
        const limit = parseInt(request.query.limit) || CONSTANTS.MAX_GET_LIMIT;
        const offset = parseInt(request.query.offset) || 0;
        
        // Parâmetros de ordenação
        let orderBy = ORDENACAO_PADRAO;
        
        if (request.query.orderBy) {
            const [campo, direcao] = request.query.orderBy.split(',');
            
            if (ORDENCAO_CAMPOS_PERMITIDOS.includes(campo)) {
                const direcaoFormatada = direcao?.toUpperCase() || 'ASC';
                
                if (ORDENCAO_DIRECAO_PERMITIDOS.includes(direcaoFormatada)) {
                    orderBy = [campo, direcaoFormatada];
                }
            }
        }
        
        // Buscar pessoas com seus telefones relacionados
        const pessoas = await PessoaModel.findAndCountAll({
            limit,
            offset,
            order: [orderBy],
            include: [{
                model: TelefoneModel,
                as: 'telefones',
                attributes: ['id', 'numero']
            }]
        });
        
        return response.status(HTTP_STATUS.SUCCESS).json({
            total: pessoas.count,
            limit,
            offset,
            data: pessoas.rows
        });
        
    } catch (error) {
        console.error('Erro ao listar pessoas:', error);
        return response.status(HTTP_STATUS.SERVER_ERROR).json({
            message: 'Erro ao processar a requisição'
        });
    }
};