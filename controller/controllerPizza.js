/*******************************************************************************************************************
* Objetivo: arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados entre e API e a model
* Autor: Eduardo Moreira Machado
* Data de criação: 30/11/2022
* Versão: 1.0
*******************************************************************************************************************/

const { MESSAGE_ERROR, MESSAGE_SUCESS } = require('../module/config.js');

//função para gerar um novo registro
const novaPizza = async function (pizza) {

    //validação de campos obrigatórios
    if (pizza.nome == undefined || pizza.preco == undefined || pizza.foto == undefined || pizza.codigo_tipo == undefined || pizza.id_categoria == undefined || pizza.qntd_favorito == undefined || pizza.ingredientes == undefined || 
        pizza.nome == '' || pizza.preco == '' || pizza.foto == '' || pizza.codigo_tipo == '' || pizza.id_categoria == '' || pizza.qntd_favorito == '' || pizza.ingredientes == '') {

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};

    } else {

        //import da model de pizza
        const novaPizza = require('../model/DAO/pizza.js');
        //chama a função para inserir uma nova pizza
        const result = await novaPizza.insertPizza(pizza);

        if (result) {

            return {status: 201, message: MESSAGE_SUCESS.INSERT_ITEM};

        } else {

            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};

        }

    }

}

//função para excluir um registro
const excluirPizza = async function (id) {

    //validação para o id como campo obrigatório
    if (id == undefined || id == '') {

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};

    } else {

        const removerPizza = require('../model/DAO/pizza.js');

        const result = await removerPizza.deletePizza(id);

        if (result) {

            return {status: 200, message: MESSAGE_SUCESS.DELETE_ITEM};

        } else {

            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};

        }

    }

}

//função para retornar um registro
const buscarPizza = async function (id) {

    if (id == undefined || id == '') {

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};

    } else {

        const selecionarPizza = require('../model/DAO/pizza.js');

        const pizza = await selecionarPizza.selectPizza(id);

        if (pizza) {

            return {status: 200, message: pizza};

        } else {

            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};

        }

    }

}

//função para retornar todos os registros
const buscarPizzas = async function () {

    const selecionarPizzas = require('../model/DAO/pizza.js');

    const pizzas = await selecionarPizzas.selectPizzas();

    if (pizzas) {

        return {status: 200, message: pizzas};

    } else {

        return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};

    }

}

//função para retornar todos os registros
const buscarPizzasDesconto = async function () {

    const selecionarPizzas = require('../model/DAO/pizza.js');

    const pizzas = await selecionarPizzas.selectDiscountPizzas();

    if (pizzas) {

        return {status: 200, message: pizzas};

    } else {

        return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};

    }

}

//função para retornar todos os registros
const buscarPizzasFavoritas = async function () {

    const selecionarPizzas = require('../model/DAO/pizza_ingrediente.js');

    const pizzas = await selecionarPizzas.selectFavoritesPizzas();

    if (pizzas) {

        return {status: 200, message: pizzas};

    } else {

        return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};

    }

}

module.exports = {

    novaPizza,
    excluirPizza,
    buscarPizzas,
    buscarPizza,
    buscarPizzasDesconto,
    buscarPizzasFavoritas

}