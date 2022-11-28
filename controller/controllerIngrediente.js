/*******************************************************************************************************************
* Objetivo: arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados entre e API e a model
* Autor: Eduardo Moreira Machado
* Data de criação: 27/11/2022
* Versão: 1.0
*******************************************************************************************************************/

const { MESSAGE_ERROR, MESSAGE_SUCESS } = require('../module/config.js');

//função para gerar um novo registro
const novoIngrediente = async function (ingrediente) {

    //validação de campos obrigatórios
    if (ingrediente.nome == undefined || ingrediente.nome == '') {

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};

    } else {

        //import da model de ingrediente
        const novoIngrediente = require('../model/DAO/ingrediente.js');
        //chama a função para inserir uma novo ingrediente
        const result = await novoIngrediente.insertIngrediente(ingrediente);

        if (result) {

            return {status: 201, message: MESSAGE_SUCESS.INSERT_ITEM};

        } else {

            return {status: 500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB};

        }

    }

}

//função para excluir um registro
const excluirIngrediente = async function (id) {

    //validação para o id como campo obrigatório
    if (id == undefined || id == '') {

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};

    } else {

        const removerIngrediente = require('../model/DAO/ingrediente.js');

        const result = await removerIngrediente.deleteIngrediente(id);

        if (result) {

            return {status: 200, message: MESSAGE_SUCESS.DELETE_ITEM};

        } else {

            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};

        }

    }

}

//função para retornar todos os registros
const listarIngredientes = async function () {

    let dadosIngredientesJSON = {};

    const { selectAllIngredientes } = require('../model/DAO/ingrediente.js');

    const dadosIngredientes = await selectAllIngredientes();

    if (dadosIngredientes) {

        dadosIngredientesJSON.ingredientes = dadosIngredientes;
        return dadosIngredientesJSON;

    } else {

        return false;

    }

}

module.exports = {

    novoIngrediente,
    excluirIngrediente,
    listarIngredientes

}