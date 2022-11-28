/*******************************************************************************************************************
* Objetivo: arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados entre e API e a model
* Autor: Eduardo Moreira Machado
* Data de criação: 27/11/2022
* Versão: 1.0
*******************************************************************************************************************/

const { MESSAGE_ERROR, MESSAGE_SUCESS } = require('../module/config.js');

//função para gerar um novo registro
const novaCategoria = async function (categoria) {

    //validação de campos obrigatórios
    if (categoria.nome == undefined || categoria.nome == '') {

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};

    } else {

        //import da model de categoria
        const novaCategoria = require('../model/DAO/categoria.js');
        //chama a função para inserir uma nova categoria
        const result = await novaCategoria.insertCategoria(categoria);

        if (result) {

            return {status: 201, message: MESSAGE_SUCESS.INSERT_ITEM};

        } else {

            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};

        }

    }

}

//função para excluir um registro
const excluirCategoria = async function (id) {

    //validação para o id como campo obrigatório
    if (id == undefined || id == '') {

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};

    } else {

        const removerCategoria = require('../model/DAO/categoria.js');

        const result = await removerCategoria.deleteCategoria(id);

        if (result) {

            return {status: 200, message: MESSAGE_SUCESS.DELETE_ITEM};

        } else {

            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};

        }

    }

}

//função para retornar todos os registros
const listarCategorias = async function () {

    let dadosCategoriasJSON = {};

    const { selectAllCategorias } = require('../model/DAO/categoria.js');

    const dadosCategorias = await selectAllCategorias();

    if (dadosCategorias) {

        dadosCategoriasJSON.categorias = dadosCategorias;
        return dadosCategoriasJSON;

    } else {

        return false;

    }

}

module.exports = {

    novaCategoria,
    excluirCategoria,
    listarCategorias

}