/*******************************************************************************************************************
* Objetivo: arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados entre e API e a model
* Autor: Eduardo Moreira Machado
* Data de criação: 30/11/2022
* Versão: 1.0
*******************************************************************************************************************/

const { MESSAGE_ERROR, MESSAGE_SUCESS } = require('../module/config.js');

//função para retornar um registro
const buscarPizza = async function (id) {

    let dadosPizzaJSON = {};

    if (id == undefined || id == '') {

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};

    } else {

        const selecionarPizza = require('../model/DAO/pizza_ingrediente.js');

        const pizza = await selecionarPizza.selectPizza(id);
        const ingrediente = await selecionarPizza.selectIngrediente(id)

        if (pizza && ingrediente) {

            dadosPizzaJSON.pizza = pizza;
            dadosPizzaJSON.ingrediente = ingrediente

            return {status: 200, message: dadosPizzaJSON};

        } else {

            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};

        }

    }

}

//função para retornar todos os registros
const buscarPizzas = async function () {

    const selecionarPizzas = require('../model/DAO/pizza_ingrediente.js');

    const pizzas = await selecionarPizzas.selectPizzas();

    if (pizzas) {

        const pizzaIngrediente = pizzas.map(async itemPizza => {

            const selecionarIngredientes = require('../model/DAO/pizza_ingrediente.js');

            const ingredientes = await selecionarIngredientes.selectIngrediente(itemPizza.id_produto);

            console.log(ingredientes)
        
            itemPizza.ingredientes = ingredientes;

            return itemPizza;

        });

        return {status: 200, message: await Promise.all(pizzaIngrediente)};

    } else {

        return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};

    }

}

//console.log(buscarPizzas())

module.exports = {

    buscarPizzas,
    buscarPizza

}