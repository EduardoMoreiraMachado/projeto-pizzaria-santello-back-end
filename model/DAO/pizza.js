/***************************************************************************************************
* Objetivo: arquivo responsável pela manipulação de dados com o BD (insert, update, delete e select)
* Autor: Eduardo Moreira Machado
* Data de criação: 30/11/2022
* Versão: 1.0
***************************************************************************************************/

//import da classe prismaClient que é responsável pelas interações com o BD
const { PrismaClient } = require('@prisma/client');

//instância da classe prismaClient
const prisma = new PrismaClient();

//função para retornar um registro
const selectPizza = async function (id) {

    let sqlPizza = `select tbl_produto.foto, tbl_produto.nome as nome_produto, tbl_produto.preco,
                    tbl_pizza.qntd_favorito, tbl_pizza.desconto,
                    tbl_categoria.nome as nome_categoria
                    from tbl_produto
                        inner join tbl_pizza
                            on tbl_produto.id = tbl_pizza.id_produto
                        inner join tbl_categoria
                            on tbl_categoria.id = tbl_produto.id_categoria
                    where tbl_produto.id = ${id};`;

    let sqlIngrediente = `select tbl_ingrediente.nome as nome_ingrediente
                          from tbl_produto
                              inner join tbl_pizza
                                  on tbl_produto.id = tbl_pizza.id_produto
                              inner join tbl_pizza_ingrediente
                                  on tbl_pizza.id = tbl_pizza_ingrediente.id_pizza
                              inner join tbl_ingrediente
                                  on tbl_ingrediente.id = tbl_pizza_ingrediente.id_ingrediente
                          where tbl_produto.id = ${id};`;

    //executa o script SQL no BD ($executeRawUnsafe() permite encaminhar uma variável contendo o script)
    const result = await prisma.$executeRawUnsafe(sqlPizza);
    result.ingrediente = await prisma.$executeRawUnsafe(sqlIngrediente);

    if (result) {

        return true;

    } else {

        return false;

    }

}

module.exports = {

    selectPizza

}