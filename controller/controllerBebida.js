/*******************************************************************************************************************
* Objetivo: arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados entre e API e a model
* Autor: Eduardo Moreira Machado
* Data de criação: 05/12/2022
* Versão: 1.0
*******************************************************************************************************************/

const { MESSAGE_ERROR, MESSAGE_SUCESS } = require('../module/config.js');

//função para gerar um novo registro
const novaBebida = async function (bebida) {

    //validação de campos obrigatórios
    if (bebida.nome == undefined || bebida.preco == undefined || bebida.foto == undefined || bebida.id_categoria == undefined||
        bebida.nome == '' || bebida.preco == '' || bebida.foto == '' || bebida.id_categoria == '') {

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};

    } else {

        //import da model de ingrediente
        const novaBebida = require('../model/DAO/bebida.js');
        //chama a função para inserir uma novo ingrediente
        const result = await novaBebida.insertBebida(bebida);

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

    novaBebida,
    excluirIngrediente,
    listarIngredientes

}