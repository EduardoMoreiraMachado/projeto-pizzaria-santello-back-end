/*******************************************************************************************************************
* Objetivo: arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados entre e API e a model
* Autor: Eduardo Moreira Machado
* Data de criação: 27/10/2022
* Versão: 1.0
*******************************************************************************************************************/

const { MESSAGE_ERROR, MESSAGE_SUCESS } = require('../module/config.js');

//função para gerar um novo cliente
const novoCliente = async function (cliente) {

    //validação de campos obrigatórios
    if (cliente.nome == undefined || cliente.email == undefined || cliente.senha == undefined ||
        cliente.nome == '' || cliente.email == '' || cliente.senha == '') {

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};

    } else {

        //import da model de cliente
        const novoCliente = require('../model/DAO/cliente.js');
        //chama a função para inserir um novo cliente
        const result = await novoCliente.insertCliente(cliente);

        if (result) {

            return {status: 201, message: MESSAGE_SUCESS.INSERT_ITEM};

        } else {

            return {status: 500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB};

        }

    }

}

//função para atualizar um registro
const atualizarCliente = async function (cliente) {

    //validação para o id como campo obrigatório
    if (cliente.id == undefined || cliente.id == '') {

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};

    }

    //validação de campos obrigatórios
    if (cliente.nome == undefined || cliente.email == undefined || cliente.senha == undefined ||
        cliente.nome == '' || cliente.email == '' || cliente.senha == '') {

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};

    } else {

        //import da model de cliente
        const atualizarCliente = require('../model/DAO/cliente.js');
        //chaa a função para atualizar um cliente 
        const result = await atualizarCliente.updateCliente(cliente);

        if (result) {

            return {status: 201, message: MESSAGE_SUCESS.UPDATE_ITEM};

        } else {

            return {status: 500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB};

        }

    }

}

//função para excluir um registro
const excluirCliente = async function (id) {

    //validação para o id como campo obrigatório
    if (id == undefined || id == '') {

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};

    } else {

        const removerCurso = require('../model/DAO/curso.js');

        const result = await removerCurso.deleteCurso(id);

        if (result) {

            return {status: 200, message: MESSAGE_SUCESS.DELETE_ITEM};

        } else {

            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};

        }

    }

}

//função para validar registros
const validarCliente = async function (email, senha) {

    if (email == undefined || senha == undefined ||
        email == '' || senha == '') {

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};

    } else {

        const verificarCliente = require('../model/DAO/cliente.js');

        const result = await verificarCliente.selectCliente(email, senha);

        if (result) {

            return {status: 200, message: MESSAGE_SUCESS.DELETE_ITEM};

        } else {

            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};

        }

    }

}

module.exports = {

    novoCliente,
    atualizarCliente,
    excluirCliente,
    validarCliente

}