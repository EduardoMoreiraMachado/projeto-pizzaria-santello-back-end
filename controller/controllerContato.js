/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

* Objetivo:         Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados entre e API e a model
 * Autor:           Marina Santello
 * Data de criação: 23/11/2022
 * Versão:          1.0

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Import do arquivo de mensagens padronizadas
const { MESSAGE_ERROR, MESSAGE_SUCESS} = require('../module/config')

// Import da model de aluno
const modelContato = require('../model/DAO/contato')

// Função para mandar as informações do novo contato e mensagem para a model
const newContato = async function(contato) {
    let contatoJSON = await contato

    // Validação de campos obrigatórios
    if (contatoJSON.nome == '' || contatoJSON.celular == '' || contatoJSON.mensagem == '' || contatoJSON.id_opcao == '' || contatoJSON.email == '' ||
        contatoJSON.nome == undefined || contatoJSON.celular == undefined || contatoJSON.mensagem == undefined || contatoJSON.id_opcao == undefined || contatoJSON.email == undefined)
        return { statusCode: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }

    // Validação para verificar se o email é válido
    else if (!contatoJSON.email.includes('@'))
        return { statusCode: 400, message: MESSAGE_ERROR.INVALID_EMAIL }
    
    // Verificação da quantidade de caracter
    else if (contatoJSON.nome.length > 80 || contatoJSON.email.length > 256)
        return { statusCode: 400, message: MESSAGE_ERROR.LIMIT_EXCEEDED }
    
    else {
        // Chama a função para inserir um novo aluno
        const result = await modelContato.insertContato(contatoJSON)

        // Verificação do retono da função (se deu certo a inserção ou não)
        if (result)
            return { statusCode: 201, message: MESSAGE_SUCESS.INSERT_ITEM }

        else
            return { statusCode: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
    }
}

// Função para retornar uma lista com todos os contatos e mensagens
const getAllContatos = async function() {
    let contatosJSON = {}

    const dadosContatos = await modelContato.selectAllContatos()

    if (dadosContatos) {
        contatosJSON.statusCode = 200
        contatosJSON.message = dadosContatos

        return contatosJSON
    }

    else
        return false
}

// Função para retornar apenas os dados de um contato por meio do ID
const getContatoByID = async function(id) {
    let idContato = id
    let contatoJSON = {}

    //validação para o id como campo obrigatório
    if (idContato == undefined || idContato == '')
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};

    else {
        const dadosContato = modelContato.selectContatoByID(idContato)

        if(dadosContato) {
            contatoJSON.statusCode = 200
            contatoJSON.message = await dadosContato

            return contatoJSON
        }

        else
            return false
    }
}

// Função para retornar apenas os dados de um contato por meio da opcao
const getContatoByOpcao = async function(opcao) {
    let opcaoContato = opcao.toLowerCase()
    let contatoJSON = {}

    //validação para o id como campo obrigatório
    if (opcaoContato == undefined || opcaoContato == '')
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};

    else {
        const dadosContato = modelContato.selectContatoByOpcao(opcaoContato)

        if(dadosContato) {
            contatoJSON.statusCode = 200
            contatoJSON.message = dadosContato

            return contatoJSON
        }

        else
            return false
    }
}





//EnPoint para buscar um contato pelo ID
app.get('/v1/contato/:opcao', cors(), async function(request, response) {
    let statusCode
    let message
    let opcaoContato = request.params.opcao

    //validação do ID na requisição
    if (opcaoContato != '' && opcaoContato != undefined) {
        //retorna os dados do contato existentes no BD
        const dadosContato = await controllerContato.getContatoByOpcao(idConopcaoContatotato)

        //valida se existe retorno de dados
        if (dadosContato) {
            //status 200
            statusCode = dadosContato.statusCode
            message = dadosContato.message

        } else {
            //status 404
            statusCode = 404;
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }

    } else {
        statusCode = 400; 
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    //retorna os dados da API
    response.status(statusCode)
    response.json(message)
})

module.exports = {
    newContato,
    getAllContatos,
    getContatoByID,
    getContatoByOpcao
}
